"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CalendarDays, Loader2, ShieldCheck, UserRound } from "lucide-react";
import Input from "@/components/ui/Input";
import { FormError, FormLabel } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { getStoredAuthContext, normalizeLearnerProfile } from "@/lib/profile";

const UPDATE_LEARNER_API_URL = "/api/users/update-learner";
const GET_LEARNERS_API_URL = "/api/users/get-learners";
const HOME_REDIRECT_PATH = "/";
const GENDER_OPTIONS = ["Male", "Female", "Other"];
const AUTH_COOKIE_KEY = "pilot_auth";

const INITIAL_VALUES = {
  name: "",
  email: "",
  contactInfo: "",
  dob: "",
  gender: "",
};

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: Yup.string().email("Enter a valid email address").required("Email is required"),
  contactInfo: Yup.string().required("Contact number is required"),
  dob: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Please select gender"),
});

function getApiErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.response?.data?.error || error?.message || fallback;
}

function setNestedProfileFields(target, updates) {
  if (!target || typeof target !== "object") return;
  for (const [key, value] of Object.entries(updates)) {
    target[key] = value;
  }
}

function isBasicProfileComplete(values) {
  const requiredFields = [values.name, values.email, values.contactInfo, values.dob, values.gender];
  return requiredFields.every((value) => Boolean(String(value || "").trim()));
}

function extractLearnerFromResponse(payload) {
  if (Array.isArray(payload?.learners) && payload.learners.length > 0) return payload.learners[0];
  if (payload?.learner) return payload.learner;
  if (Array.isArray(payload?.data?.learners) && payload.data.learners.length > 0) return payload.data.learners[0];
  if (payload?.data?.learner) return payload.data.learner;
  if (payload?.data) return payload.data;
  return payload;
}

export default function MyAccountPage() {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [learnerID, setLearnerID] = useState("");

  function handleLogout() {
    sessionStorage.removeItem("pilotUser");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("profileCompleted");
    localStorage.removeItem("pilotUser");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profileCompleted");
    document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
    router.replace("/login");
  }

  const hydrateProfileIntoSession = useCallback((profilePayload) => {
    const rawUser = sessionStorage.getItem("pilotUser");
    if (!rawUser) return;
    try {
      const parsedUser = JSON.parse(rawUser);
      const learnerNode = extractLearnerFromResponse(profilePayload);
      const normalized = normalizeLearnerProfile(learnerNode);
      const updates = {
        learnerID: String(learnerNode?.learnerID || learnerNode?.learnerId || learnerNode?.learner_id || "").trim(),
        name: normalized.name,
        email: normalized.email,
        contactInfo: normalized.contactInfo,
        dob: normalized.dob,
        gender: normalized.gender,
      };
      setNestedProfileFields(parsedUser, updates);
      setNestedProfileFields(parsedUser?.user, updates);
      setNestedProfileFields(parsedUser?.data, updates);
      setNestedProfileFields(parsedUser?.data?.user, updates);
      if (learnerNode && typeof parsedUser === "object") {
        parsedUser.learner = learnerNode;
      }
      sessionStorage.setItem("pilotUser", JSON.stringify(parsedUser));
    } catch {
      // Ignore session payload shape issues.
    }
  }, []);

  const loadLatestProfile = useCallback(
    async ({ token, id }) => {
      const response = await fetch(`${GET_LEARNERS_API_URL}?learnerID=${encodeURIComponent(id)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      const result = await response.json().catch(() => null);
      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("pilotUser");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("accessToken");
        throw new Error("Your session has expired. Please login again.");
      }
      if (!response.ok || result?.success === false || result?.ok === false) {
        throw new Error(result?.message || `Request failed with status code ${response.status}`);
      }

      const learnerNode = extractLearnerFromResponse(result);
      const normalized = normalizeLearnerProfile(learnerNode);

      hydrateProfileIntoSession(result);
      return normalized;
    },
    [hydrateProfileIntoSession]
  );

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError("");
      setSubmitSuccess("");

      if (!authToken) {
        setSubmitError("Your session has expired. Please login again.");
        setSubmitting(false);
        router.replace("/login");
        return;
      }

      if (!learnerID) {
        setSubmitError("Learner ID is missing. Please login again.");
        setSubmitting(false);
        router.replace("/login");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("learnerID", learnerID);
        formData.append("name", values.name.trim());
        formData.append("email", values.email.trim());
        formData.append("contactInfo", values.contactInfo.trim());
        formData.append("dob", values.dob);
        formData.append("gender", values.gender);

        const response = await fetch(UPDATE_LEARNER_API_URL, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });
        const result = await response.json().catch(() => null);
        if (!response.ok || result?.success === false || result?.ok === false) {
          throw new Error(result?.message || `Request failed with status code ${response.status}`);
        }

        await loadLatestProfile({ token: authToken, id: learnerID });

        sessionStorage.setItem("profileCompleted", "1");
        setSubmitSuccess("Profile updated successfully. Redirecting to home...");
        window.setTimeout(() => router.push(HOME_REDIRECT_PATH), 1000);
      } catch (error) {
        const rawMessage = getApiErrorMessage(error, "Failed to update profile. Please try again.");
        setSubmitError(rawMessage);
        if (String(rawMessage).toLowerCase().includes("session")) {
          router.replace("/login");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const authContext = getStoredAuthContext();
    const token = authContext.token;

    if (!token) {
      setPageError("Please login to access your profile.");
      setIsPageLoading(false);
      sessionStorage.removeItem("pilotUser");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("accessToken");
      router.replace("/login");
      return;
    }

    const id = authContext.learnerID;
    if (!id) {
      setPageError("Learner ID is missing. Please login again.");
      setIsPageLoading(false);
      sessionStorage.removeItem("pilotUser");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("accessToken");
      router.replace("/login");
      return;
    }

    setAuthToken(token);
    setLearnerID(id);

    let cancelled = false;
    async function run() {
      try {
        const normalized = await loadLatestProfile({ token, id });
        if (cancelled) return;
        formik.setValues(
          {
            name: normalized.name || "",
            email: normalized.email || "",
            contactInfo: normalized.contactInfo || "",
            dob: normalized.dob || "",
            gender: normalized.gender || "",
          },
          false
        );
        if (!isBasicProfileComplete(normalized)) {
          setPageError("Your profile is incomplete. Please fill all required fields before booking.");
        } else {
          setPageError("");
        }
      } catch (error) {
        if (cancelled) return;
        const message = getApiErrorMessage(error, "Could not load profile data. Please login again.");
        setPageError(message);
        if (String(message).toLowerCase().includes("session")) {
          router.replace("/login");
        }
      } finally {
        if (!cancelled) {
          setIsPageLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router, loadLatestProfile]);

  const profileIsComplete = useMemo(() => isBasicProfileComplete(formik.values), [formik.values]);
  const profileCompletionCount = useMemo(
    () =>
      [formik.values.name, formik.values.email, formik.values.contactInfo, formik.values.dob, formik.values.gender]
        .map((value) => Boolean(String(value || "").trim()))
        .filter(Boolean).length,
    [formik.values]
  );
  const profileInitial = String(formik.values.name || formik.values.email || "U").charAt(0).toUpperCase();

  if (isPageLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFFFF] px-4">
        <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-medium text-slate-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50/60 to-white px-4 pb-10 pt-24 font-lexend md:pt-28">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl flex-col justify-center">
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:mb-8 sm:p-5">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">My Profile</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Manage your personal details for a faster and smoother booking journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr] lg:gap-7">
          <aside className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(37,99,235,0.08)] sm:p-6 lg:flex lg:h-full lg:flex-col">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 text-xl font-bold text-slate-700">
                {profileInitial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-slate-900">{formik.values.name || "Your Name"}</p>
                <p className="truncate text-xs font-medium text-slate-500">{formik.values.email || "you@example.com"}</p>
                <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-wide text-blue-700/90">
                  Learner ID: {learnerID || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5">
                <span className="text-xs font-semibold text-slate-600">Profile completion</span>
                <span className="text-xs font-bold text-slate-900">{profileCompletionCount}/5</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all"
                  style={{ width: `${Math.min(100, (profileCompletionCount / 5) * 100)}%` }}
                />
              </div>
            </div>

            <div className="mt-6 space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <UserRound className="h-4 w-4 text-blue-600" />
                Keep your personal details up to date
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <CalendarDays className="h-4 w-4 text-blue-600" />
                Correct DOB helps streamline verification
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                {profileIsComplete ? "Profile completed. Booking is now enabled." : "Complete profile to unlock booking"}
              </div>
            </div>

            <Button
              href="/packages"
              className={`mt-6 w-full py-3 lg:mt-auto ${profileIsComplete ? "" : "pointer-events-none opacity-60"}`}
            >
              Continue to Booking
            </Button>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 w-full rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              Logout
            </button>
          </aside>

          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(37,99,235,0.08)] sm:p-8">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Complete Profile</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Update your details and save to continue with your booking.
              </p>
            </div>

            <form className="mt-6 space-y-5 sm:space-y-6" onSubmit={formik.handleSubmit}>
              <div className="space-y-3">
                {pageError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {pageError}
                  </div>
                ) : null}
                {submitSuccess ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                    {submitSuccess}
                  </div>
                ) : null}
                {submitError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {submitError}
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5">
                <div>
                  <FormLabel htmlFor="name" className="mb-1.5 text-xs md:text-sm">
                    Name
                  </FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...formik.getFieldProps("name")}
                    hasError={Boolean(formik.touched.name && formik.errors.name)}
                    disabled={formik.isSubmitting}
                    className="sm:rounded-xl rounded-full sm:py-3 py-2"
                  />
                  <FormError className="mt-1 text-xs">
                    {formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                  </FormError>
                </div>

                <div className="mt-4">
                  <FormLabel htmlFor="email" className="mb-1.5 text-xs md:text-sm">
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    {...formik.getFieldProps("email")}
                    hasError={Boolean(formik.touched.email && formik.errors.email)}
                    disabled={formik.isSubmitting}
                    className="sm:rounded-xl rounded-full sm:py-3 py-2"
                  />
                  <FormError className="mt-1 text-xs">
                    {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                  </FormError>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <FormLabel htmlFor="contactInfo" className="mb-1.5 text-xs md:text-sm">
                      Contact Number
                    </FormLabel>
                    <Input
                      id="contactInfo"
                      name="contactInfo"
                      type="text"
                      placeholder="Contact number"
                      {...formik.getFieldProps("contactInfo")}
                      hasError={Boolean(formik.touched.contactInfo && formik.errors.contactInfo)}
                      disabled={formik.isSubmitting}
                      className="sm:rounded-xl rounded-full sm:py-3 py-2"
                    />
                    <FormError className="mt-1 text-xs">
                      {formik.touched.contactInfo && formik.errors.contactInfo ? formik.errors.contactInfo : ""}
                    </FormError>
                  </div>

                  <div>
                    <FormLabel htmlFor="dob" className="mb-1.5 text-xs md:text-sm">
                      Date of Birth
                    </FormLabel>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      {...formik.getFieldProps("dob")}
                      hasError={Boolean(formik.touched.dob && formik.errors.dob)}
                      disabled={formik.isSubmitting}
                      className="sm:rounded-xl rounded-full sm:py-3 py-2"
                    />
                    <FormError className="mt-1 text-xs">
                      {formik.touched.dob && formik.errors.dob ? formik.errors.dob : ""}
                    </FormError>
                  </div>

                  <div className="sm:col-span-2">
                    <FormLabel htmlFor="gender" className="mb-1.5 text-xs md:text-sm">
                      Gender
                    </FormLabel>
                    <Input
                      as="select"
                      id="gender"
                      name="gender"
                      {...formik.getFieldProps("gender")}
                      hasError={Boolean(formik.touched.gender && formik.errors.gender)}
                      disabled={formik.isSubmitting}
                      className="sm:rounded-xl rounded-full sm:py-3 py-2"
                    >
                      <option value="">Select gender</option>
                      {GENDER_OPTIONS.map((genderOption) => (
                        <option key={genderOption} value={genderOption}>
                          {genderOption}
                        </option>
                      ))}
                    </Input>
                    <FormError className="mt-1 text-xs">
                      {formik.touched.gender && formik.errors.gender ? formik.errors.gender : ""}
                    </FormError>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="btn-gradient btn-gradient-glow flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:rounded-xl sm:py-4"
                >
                  {formik.isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving profile...</span>
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}

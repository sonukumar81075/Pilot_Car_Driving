"use client";

import { Container } from "@/components/ui/Container";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";
import { SectionHeading } from "@/components/ui/SectionHeading";

const AccountDeletionSchema = Yup.object().shape({
  accountType: Yup.string().oneOf(["learner", "instructor"]).required("Please select account type"),
  phone: Yup.string().required("Required").matches(/^[0-9]{10}$/, "Invalid number"),
  reason: Yup.string().required("Reason is required").min(10, "Too short"),
  confirmation: Yup.boolean().oneOf([true], "Must confirm"),
});

export default function AccountDeletionPage() {
  return (
    <main className="min-h-screen pt-32 md:pt-40 pb-6 bg-[#FFFFFF] font-lexend">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">

            <SectionHeading
              title="Account Deletion Request"
              description="We're sorry to see you go. This process will permanently remove your data from the Pilot Mobility ecosystem in compliance with privacy laws."
              align="center"
            />
          </div>



          {/* Request Details Form (full-width, below notice) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 md:p-12">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900">Request Details</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Identity Verified
                </span>
              </div>
            </div>

            <Formik
              initialValues={{ accountType: "", phone: "", email: "", reason: "", confirmation: false }}
              validationSchema={AccountDeletionSchema}
              onSubmit={(values) => console.log(values)}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-8">
                  {/* Account Type Selection */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-800">
                      Type of Account <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <AccountTypeBtn
                        active={values.accountType === "learner"}
                        onClick={() => setFieldValue("accountType", "learner")}
                        title="Learner"
                        sub="I am learning to drive"
                      />
                      <AccountTypeBtn
                        active={values.accountType === "instructor"}
                        onClick={() => setFieldValue("accountType", "instructor")}
                        title="Instructor"
                        sub="I am an instructor"
                      />
                    </div>
                    <ErrorMessage
                      name="accountType"
                      component="p"
                      className="text-xs text-rose-500 font-medium mt-1"
                    />
                  </div>

                  {/* Input Group */}
                  <div className="space-y-5">
                    <CustomInput
                      label="Registered Mobile Number"
                      name="phone"
                      placeholder="10-digit number"
                      prefix="+91"
                    />
                    <CustomInput
                      label="Registered Email ID (optional)"
                      name="email"
                      placeholder="email@example.com"
                    />

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-800">Reason for leaving</label>
                      <Field
                        as="textarea"
                        name="reason"
                        rows={4}
                        className="w-full rounded-2xl border border-slate-200 p-5 text-sm font-sans focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all resize-none bg-[#fdfdfd]"
                        placeholder="Tell us how we can improve..."
                      />
                      <ErrorMessage
                        name="reason"
                        component="p"
                        className="text-xs text-rose-500"
                      />
                    </div>
                  </div>

                  {/* Checkbox Warning Card */}
                  <label className="flex items-start gap-4 p-5 bg-slate-50/80 rounded-2xl border border-slate-100 cursor-pointer group transition-colors hover:bg-slate-100/50">
                    <Field
                      type="checkbox"
                      name="confirmation"
                      className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-500 leading-relaxed font-sans">
                      I understand that deleting my account is{" "}
                      <b className="text-slate-900">permanent</b> and{" "}
                      <b className="text-slate-900">irreversible</b>. All my certificates and
                      progress will be lost.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-4.5 bg-[#2563eb]  text-white rounded-full font-bold text-lg shadow-[0_12px_24px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    Submit Deletion Request
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          {/* Important Notice (full-width, above form) */}
          <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-[2.5rem] p-8 md:p-10 shadow-sm mt-8">
            <div className="flex items-center gap-3 text-[#991B1B] mb-6">
              <MdOutlineWarningAmber className="text-2xl" />
              <h3 className="text-xl font-bold tracking-tight">Important Notice</h3>
            </div>

            <div className="space-y-8">
              {/* Part 1 */}
              <div className="space-y-4">
                <p className="text-[15px] font-bold text-[#991B1B] leading-snug">
                  Deleting your account with Pilot Mobility is permanent and irreversible.
                </p>
                <p className="text-[13px] font-bold text-slate-500 uppercase tracking-wide">
                  Once your account is deleted:
                </p>
                <div className="space-y-4">
                  <NoticeItem text="All personal information stored by Pilot Mobility will be permanently removed from active systems" />
                  <NoticeItem text="Booking history, payment records, and session details will be deleted" />
                  <NoticeItem text="Certificates, learning progress data, and saved preferences will be erased" />
                  <NoticeItem text="You will immediately lose access to your account" />
                  <NoticeItem text="This action cannot be undone" />
                </div>
              </div>

              {/* Part 2 */}
              <div className="space-y-4 pt-6 border-top border-rose-200/50">
                <h4 className="text-[17px] font-bold text-[#991B1B]">Who Can Request Deletion?</h4>
                <div className="space-y-3">
                  <NoticeItem text="Users registered as Pilot Learners" />
                  <NoticeItem text="Users registered as Pilot Instructors" />
                </div>
                <p className="text-xs text-slate-500 italic font-sans">
                  All requests must be submitted by the registered account holder.
                </p>
              </div>

              {/* Part 3 */}
              <div className="space-y-4 pt-6 border-t border-rose-200/50">
                <h4 className="text-[17px] font-bold text-[#991B1B]">
                  What Happens After You Submit a Request?
                </h4>
                <div className="space-y-4">
                  <NoticeItem text="Your request will be submitted to the Pilot Mobility Support Team for verification" />
                  <NoticeItem text="The team may contact you to confirm your identity" />
                  <NoticeItem text="Once verified and approved, your account and associated data will be permanently deleted from active systems" />
                  <NoticeItem text="You will be logged out from all devices linked to your account" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

/* --- Reusable Sub-components --- */

function AccountTypeBtn({ active, onClick, title, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${active
        ? "border-blue-500 bg-white shadow-[0_8px_20px_rgba(59,130,246,0.12)]"
        : "border-slate-50 bg-[#FDFDFD] hover:border-slate-200"
        }`}
    >
      <div className={`text-base font-bold ${active ? "text-slate-900" : "text-slate-800"}`}>{title}</div>
      <div className="text-[11px] text-slate-400 font-sans mt-1 leading-tight">{sub}</div>
    </button>
  );
}

function CustomInput({ label, prefix, ...props }) {
  return (
    <div className="space-y-2.5">
      <label className="text-sm font-bold text-slate-800">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute left-5 text-sm font-bold text-slate-400 border-r border-slate-100 pr-4 mr-4 leading-none">
            {prefix}
          </div>
        )}
        <Field
          {...props}
          className={`w-full rounded-2xl border border-slate-200 py-4 text-sm font-sans focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all ${prefix ? 'pl-[4.5rem]' : 'pl-5'} pr-5 bg-[#fdfdfd]`}
        />
      </div>
      <ErrorMessage name={props.name} component="p" className="text-xs text-rose-500 font-medium" />
    </div>
  );
}

function NoticeItem({ text }) {
  return (
    <div className="flex gap-4 items-start group">
      <div className="mt-0.5 p-0.5 rounded-full border border-rose-200 bg-white">
        <MdCheckCircleOutline className="text-rose-500 text-sm" />
      </div>
      <p className="text-[14px] text-slate-600 font-sans font-medium leading-snug group-hover:text-[#991B1B] transition-colors">{text}</p>
    </div>
  );
}
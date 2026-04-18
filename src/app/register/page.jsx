"use client";

import Link from "next/link";
import Image from "next/image";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import Input from "@/components/ui/Input";
import { FormError, FormLabel } from "@/components/ui/FormField";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().min(2, "Too short").max(60, "Too long").required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().min(10, "Enter valid phone number").required("Phone number is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterPage() {
  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <main className="min-h-screen bg-[#FFFFFF] font-lexend flex min-h-screen items-center justify-center py-0 px-0 sm:py-12 sm:px-4">
      <section className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-none sm:rounded-[40px] border border-gray-100 bg-[#FFFFFF] shadow-[0_30px_100px_rgba(37,99,235,0.08)] md:flex-row">
        {/* <aside className="hidden md:flex relative flex w-full flex-col justify-center bg-[#f0f7ff] p-6 sm:p-10 md:w-1/2 lg:p-16">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-3xl" />
          <div className=" relative z-10">
            <div className="mb-8">
              <Image
                src="/images/logo/Pilot Logo.png"
                alt="Pilot Logo"
                width={110}
                height={35}
                priority
                className="h-auto w-[110px] object-contain"
              />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold leading-[1.15] sm:leading-[1.1] text-slate-900 lg:text-5xl">
              Create Your <span className="text-blue-600">Pilot Account.</span>
            </h2>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg font-medium text-slate-500">
              Register to start lessons, manage bookings, and track your driving journey.
            </p>

            <ul className="mt-6 sm:mt-10 flex flex-col gap-2 sm:gap-3">
              <li className="flex items-center gap-2 rounded-full border border-blue-50 bg-white px-3 sm:px-4 py-2 text-[13px] sm:text-sm font-bold text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500 mr-1" />
                Start Learning Journey
              </li>
              <li className="flex items-center gap-2 rounded-full border border-blue-50 bg-white px-3 sm:px-4 py-2 text-[13px] sm:text-sm font-bold text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500 mr-1" />
                Manage Batches & Sessions
              </li>
              <li className="flex items-center gap-2 rounded-full border border-blue-50 bg-white px-3 sm:px-4 py-2 text-[13px] sm:text-sm font-bold text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500 mr-1" />
                Get Progress Updates
              </li>
            </ul>
          </div>

        </aside> */}

        <div className="block md:hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 pt-10 pb-16 px-7 rounded-b-[40px] relative overflow-hidden pt-18 pb-18">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-50" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-white text-3xl font-bold">Hello!</h2>
              <p className="text-blue-100 mt-1 font-semibold">Sign Up!</p>
            </div>
            <div className="rounded-xl bg-white/15 px-3 py-2 text-right backdrop-blur-sm">
              <p className="text-[11px] font-semibold tracking-wide text-blue-100 uppercase">New User</p>
              <p className="text-sm font-bold text-white">Sign Up</p>
            </div>
          </div>

        </div>
        <aside className="relative w-full overflow-hidden bg-[#C1CCDB] md:w-1/2">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="relative h-full min-h-[280px]">
            <Image
              src="/images/pilot_generate_01.png"
              alt="Pilot Logo"
              fill
              priority
              className="object-contain object-center sm:scale-150 justify-center items-center mx-auto scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </aside>


        <div className="flex w-full flex-col justify-center p-6 sm:p-6 md:w-1/2 lg:p-12">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Register</h1>
            <p className="mt-2 text-sm sm:text-base font-medium text-slate-400">Create your account and get started.</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              // TODO: integrate register API call here.
              console.log("Register payload:", values);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4 sm:space-y-5">
                <div>
                  <FormLabel htmlFor="fullName" className="text-[13px] sm:text-sm">Full Name</FormLabel>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Field
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      as={Input}
                      withIcon
                      hasError={Boolean(errors.fullName && touched.fullName)}
                      className="py-3 sm:py-3.5 text-[13px] sm:text-sm rounded-full "
                      placeholder="Enter your full name"
                    />
                  </div>
                  <FormError className="text-[11px] sm:text-xs">{errors.fullName && touched.fullName ? errors.fullName : ""}</FormError>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <FormLabel htmlFor="email" className="text-[13px] sm:text-sm">Email</FormLabel>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        as={Input}
                        withIcon
                        hasError={Boolean(errors.email && touched.email)}
                        className="py-3 sm:py-3.5 text-[13px] sm:text-sm rounded-full "
                        placeholder="you@example.com"
                      />
                    </div>
                    <FormError className="text-[11px] sm:text-xs">{errors.email && touched.email ? errors.email : ""}</FormError>
                  </div>

                  <div>
                    <FormLabel htmlFor="phone" className="text-[13px] sm:text-sm">Phone Number</FormLabel>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Field
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        as={Input}
                        withIcon
                        hasError={Boolean(errors.phone && touched.phone)}
                        className="py-3 sm:py-3.5 text-[13px] sm:text-sm rounded-full "
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <FormError className="text-[11px] sm:text-xs">{errors.phone && touched.phone ? errors.phone : ""}</FormError>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <FormLabel htmlFor="password" className="text-[13px] sm:text-sm">Password</FormLabel>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        as={Input}
                        withIcon
                        hasError={Boolean(errors.password && touched.password)}
                        className="py-3 sm:py-3.5 text-[13px] sm:text-sm rounded-full "
                        placeholder="Create password"
                      />
                    </div>
                    <FormError className="text-[11px] sm:text-xs">{errors.password && touched.password ? errors.password : ""}</FormError>
                  </div>

                  <div>
                    <FormLabel htmlFor="confirmPassword" className="text-[13px] sm:text-sm">Confirm Password</FormLabel>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        as={Input}
                        withIcon
                        hasError={Boolean(errors.confirmPassword && touched.confirmPassword)}
                        className="py-3 sm:py-3.5 text-[13px] sm:text-sm rounded-full "
                        placeholder="Re-enter password"
                      />
                    </div>
                    <FormError className="text-[11px] sm:text-xs">{errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}</FormError>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient btn-gradient-glow group relative flex w-full items-center justify-center gap-2 rounded-full py-3 sm:py-4 text-[13px] sm:text-sm font-bold text-white transition active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? "Creating..." : "Register"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-7 sm:mt-10 text-center">
            <p className="text-[13px] sm:text-sm font-medium text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">
                Sign in now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

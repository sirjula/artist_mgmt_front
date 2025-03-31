"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/api/api";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImage from "@/assets/images/login.jpg";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [userData, setuserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword:"",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    role_type: "", 
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setuserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
 

    try {
      console.log("Attempting signup with:", userData)
      const response = await signUp({ ...userData, role: userData.role_type })
      console.log("Signup successful:", response)


    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }
     
        router.push("/")
    } catch (error) {
      console.error("Signup error:", error)
      if (error instanceof Error) {
        setError(error.message || "Registration failed. Please try again.")
      } else if (typeof error === "object" && error !== null) {
        // Handle API error responses which might be in different formats
        const errorMessage = JSON.stringify(error)
        setError(errorMessage || "Registration failed. Please try again.")
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 wd">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            method="POST"
            onSubmit={handleSubmit}
            className="p-6 md:p-8"
            noValidate
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Artist Management System</h1>
                <p>Sign up and start managing artists!</p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={userData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={userData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    name="gender"  
                    value={userData.gender}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="o">Other</option>
                  </select>

                </div>

                <div className="grid gap-3">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                     name="dob"
                    type="date"
                    value={userData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={userData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    value={userData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="role_type">Role</Label>
                  <select
                    id="role"
                    name="role_type" 
                    value={userData.role_type}
                    onChange={handleChange} 
                    className="border p-2 rounded"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="artist_manager">Artist Manager</option>
                    <option value="artist">Artist</option>
                  </select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email" 
                    type="email"
                    placeholder="abc123@example.com"
                    value={userData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password" 
                      type={showPassword ? "text" : "password"}
                      value={userData.password}
                      onChange={handleChange}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmpassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword" 
                    type="password"
                    value={userData.confirmPassword}
                    onChange={handleChange} 
                    required
                  />

                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-400"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                href="/"
                className="underline underline-offset-4 "
              >
                Login
              </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              width={500}
              height={500}
              src={loginImage}
              alt="SignUp Image"
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

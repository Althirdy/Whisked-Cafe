import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import InputField from "../../Components/InputField";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen  p-4 md:p-6">
      <div className="mx-auto mt-5 max-w-lg">
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-brown-800">
              Register your account
            </h1>
            <p className="text-gray-500">
              We’re excited to have you join us! Please provide the information
              below to get started:
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <InputField
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              label="FullName"
            />
            <InputField
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              label="Phone No."
              placeholder="+63"
            />
            <InputField
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              label="Email"
            />
            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm pr-10 focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {/* ConfirmPassword */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm pr-10 focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-brown-600 focus:ring-brown-500"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-brown-600 underline hover:text-brown-800"
                >
                  Terms and Conditions
                </button>{" "}
                &{" "}
                <button
                  type="button"
                  className="text-brown-600 underline hover:text-brown-800"
                >
                  Privacy Policy
                </button>
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-brown-600 py-3 text-white transition-colors hover:bg-brown-700"
            >
              Sign Up
            </button>
          <span className="inline-flex items-center text-sm text-gray-500">
            Already Have an Account?{" "}
            <Link to="/login" className="ml-2 text-blue-700 underline">
              Sign In
            </Link>
          </span>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Link from "next/link";
import { LayoutLogin } from "@/components/layouts/LayoutLogin";
import { toast } from "react-toastify";
import { UserEntity } from "@/types/user_entity";
import { useRouter } from "next/router";
import { setCookie } from "@/utils/cookie-handling";

export default function LoginSection() {
  const router = useRouter();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const user = data.user as UserEntity;
        const token = data.token as string;
        setCookie("user", JSON.stringify(user));
        setCookie("token", token);
        toast.success(`Welcome bro ${user.name} your point is ${user.point}`, {
          position: "top-left",
          autoClose: 400, // Close after 2 seconds
          onClose: () => {
            router.push("/dashboard");
          },
        });
      } else if (response.status === 422) {
        setErrors(data);
      } else {
        toast.error(data.message, {
          position: "top-left",
        });
      }
    } catch (error) {
      toast.error(`something wrong ${error}`, {
        position: "top-left",
      });
    }
    setLoading(false);
  };

  return (
    <LayoutLogin>
      <div className="flex flex-col items-center justify-center column">
        <h2 className="mt-20 text-2xl font-extrabold tracking-tight text-slate-900">
          Welcome to Your Amazon books
        </h2>
        <p className="text-slate-900 mb-10">choose your books what you like</p>
      </div>

      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          Login
        </span>
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              Email
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="mt-1 block text-sm text-red-400">
                {errors.email[0]}
              </span>
            )}
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">
              Password
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="mt-1 block text-sm text-red-400">
                {errors.password[0]}
              </span>
            )}
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link
          href="/register"
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          Create an account
        </Link>
      </div>
    </LayoutLogin>
  );
}

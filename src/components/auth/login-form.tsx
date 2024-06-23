import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthenticationStore } from "@/store/auth";
import { Link } from "@tanstack/react-router";
import Placeholder from "../../assets/placeholder.svg";

export function LoginForm() {
  const login = useAuthenticationStore(s => s.login);
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 overflow-hidden">
      <div className="flex items-center justify-center  h-screen overflow-auto">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">ورود</h1>
            <p className="text-balance text-muted-foreground">
              ایمیل خود را برای ورود به حساب کاربری خود وارد نمایید
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">رمز عبور</Label>
                <Link
                  href="/forgot-password"
                  className="mr-auto inline-block text-sm underline"
                >
                  رمز عبور خود را فراموش کرده اید؟
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" onClick={login}>
              ورود
            </Button>
            <Button variant="outline" className="w-full">
              ورود با گوگل
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            حساب کاربری ندارید؟
            <Link href="#" className="underline">
              ثبت نام کنید
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block">
        <img
          src={Placeholder}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

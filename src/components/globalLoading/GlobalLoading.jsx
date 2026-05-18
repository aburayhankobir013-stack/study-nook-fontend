import { Spinner } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="xs:hidden">
        <Spinner size="sm" />
      </div>
      <div className="hidden xs:block">
        <Spinner size="md" />
      </div>
      <div className="hidden md:block">
        <Spinner size="lg" />
      </div>
      <div className="hidden lg:block">
        <Spinner size="xl" />
      </div>
    </div>
  );
}

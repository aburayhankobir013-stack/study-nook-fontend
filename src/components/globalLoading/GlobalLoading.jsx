import { Spinner } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-green-100">
      <Spinner size="lg" />
    </div>
  );
}
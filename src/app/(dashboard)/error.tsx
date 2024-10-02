"use client";
import { Button } from "@/components/ui/button";

 // Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Sessión expirada! </h2>
      <span>{JSON.stringify(error)}</span>
      <Button onClick={() => reset()}>Login</Button>
    </div>
    //  <html>
    //   <body>
    //     <h2>Something went wrong!</h2>
    //     <button onClick={() => reset()}>Try again</button>
    //   </body>
    // </html>
  );
}



import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const getData = async () => {
  await new Promise((resolove) => setTimeout(resolove, 3000))

  return '123456789'.split('')
}

export default async function SkeletonPage() {

  const data = await getData()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3  gap-3">
      {data.map((item) => (
        <Card key={item}>
          <CardHeader className="flex flex-row">
            <Image
              src="/assets/images/rucio.jpg"
              alt="chad"
              width={40}
              height={40}
              className="rounded-full mr-2 w-10 h-10"
            />
            <div >
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description</CardDescription>
            </div>
          </CardHeader>

          <CardFooter className="flex justify-end">
            <Button>mas</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
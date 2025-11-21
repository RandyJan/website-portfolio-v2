import React from "react";
import { Icons } from "@/components/icons"
export default function Footer() {

    return (
        <div className="bg-gray-100 dark:bg-[#31363F] p-7 flex  justify-center  gap-2">
            <p>Powered by Next JS </p>
            <Icons.logo className="h-6 w-6" />
        </div>
    );
}

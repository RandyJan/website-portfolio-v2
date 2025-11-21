import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import certificationData from "@/app/segment/certifications/values.json";

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="lg:h-[90%] container pb-10" id="certifications">
      {/* Header */}
      <div
        className="flex flex-col md:flex-row items-center justify-center 
                   text-4xl md:text-5xl dark:text-white gap-3 md:gap-5 p-10"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
      >
        <div className="flex flex-row items-center gap-3">
          <FontAwesomeIcon icon={faCertificate} />
          <p>Certifications</p>
        </div>

        <span
          className="text-2xl md:text-3xl font-semibold
                     bg-gradient-to-r from-blue-500 to-purple-500 
                     bg-clip-text text-transparent"
        >
          {certificationData.Certifications.length} Documents
        </span>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:pt-8 sm:w-[100%] sm:m-auto">
        {certificationData.Certifications.map((cert, index) => (
          <Card
            key={index}
            className="h-full pb-3 sm:p-0 dark:bg-[#31363F] rounded-xl cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={200 + index * 100}
            data-aos-duration="600"
            onClick={() => setSelectedImage(cert.image)}
          >
            <CardContent className="flex flex-col items-center">
              <img
                src={cert.image}
                alt={cert.name}
                className="w-32 h-32 sm:w-60 sm:h-60 object-cover rounded-xl mb-4 mt-4"
              />
              <h3 className="text-center text-lg font-semibold dark:text-white">
                {cert.name}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="certificate"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

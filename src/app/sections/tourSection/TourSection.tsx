import React, { useEffect, useState } from "react";
import GalleryCard from "./localComponents/galleryCard/GalleryCard";
import styles from "./TourSection.module.css";
import { useAppSelector } from "@/app/Redux/hooks";
import { selectBusinessData } from "@/app/Redux/slice/businessSlice/BusinessData";
import Image from "next/image";

// Type for individual photo data
interface Photo {
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  _id: string;
}

// Type for business data
interface BusinessData {
  photoGallery: Photo[];
  videoTour?: {
    originalName: string;
    mimetype: string;
    path: string;
  };
}

function TourSection() {
  const businessData = useAppSelector<BusinessData | null>(selectBusinessData);
  const [activeImageUrl, setactiveImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (businessData?.photoGallery?.length) {
      setactiveImageUrl(convertGoogleDriveLinkImg(businessData.photoGallery[0].path));
    }
  }, [businessData]);
  // console.log(businessData)
  // Function to convert Google Drive video link
  // const convertVideoGoogleDriveLink = (viewLink: string): string => {
  //   if (viewLink && typeof viewLink === "string" && viewLink.includes("drive.google.com")) {
  //     const fileId = viewLink.split("/d/")[1]?.split("/")[0];
  //     return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : "";
  //   }
  //   return viewLink;
  // };

  const convertGoogleDriveLinkImg = (viewLink: string) => {
    if (typeof viewLink === "string" && viewLink.includes("drive.google.com")) {
      const fileId = viewLink.split("/d/")[1]?.split("/")[0];
      return `https://drive.google.com/uc?id=${fileId}`;
    }
    return viewLink;
  };
  // Check if businessData exists
  if (!businessData) {
    return <div>No business data available</div>;
  }

  return (
    <div className={styles.tourContainer}>
      <div className={styles.tourTitleText}>
        <h1>Tour</h1>
        <p>
          Have a <span>Virtual Tour</span>
        </p>
      </div>
      <hr className={styles.divider} />

      <div className={styles.hero}>
        {/* Video Section */}
        <div className={styles.active}>
          {/* <GalleryCard
                key={0 || 7} // Use _id if available
                imageUrl={"https://drive.google.com/file/d/1GUXgAAsFx6qhrwddbBKz5xv2oCop7Gl7/view?usp=drivesdk"}
                altText={"imh"}
                setactiveImageUrl={setactiveImageUrl}
                width={300} // Set a default width or dynamically handle the size
                height={200} // Set a default height
              /> */}

          {activeImageUrl ? (
            <Image
              src={activeImageUrl}
              alt="img"
              className={styles.activeImage}
              height={600}
              width={1300}
              // style={{ objectFit: "cover" }}
            />

          ) : (
            <p>No image selected</p> // Display a message or a placeholder when no image is selected
          )}

        </div>
        <hr className={styles.heroDivider} />

        {/* Photo Gallery Section */}
        <div className={`${styles.scrollGallery} hideScrollBar`}>
          {businessData.photoGallery.length > 0 ? (
            businessData.photoGallery.map((photo, index) => (
              <GalleryCard
                activeImageLink={activeImageUrl}
                key={photo._id || index} // Use _id if available
                imageUrl={photo.path}
                altText={photo.originalName}
                setactiveImageUrl={setactiveImageUrl}
                width={300}
                height={200} 
              />
            ))
          ) : (
            <p>No photos available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TourSection;

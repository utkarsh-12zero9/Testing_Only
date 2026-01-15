import React from "react";
import styles from './GalleryCard.module.css';
import Image from "next/image";
import { convertGoogleDriveLink } from "@/lib/convertGoogleDriveLink";

interface GalleryCardProps {
  imageUrl: string;
  altText: string;
  width: number;
  height: number;
  setactiveImageUrl: (url: string) => void;  // Updated type to match usage
  activeImageLink: string | null;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  imageUrl,
  altText,
  width,
  height,
  setactiveImageUrl,
  activeImageLink
}) => {
  const convertedUrl = convertGoogleDriveLink(imageUrl); 

  return (
    <div 
      className={styles.card} 
      style={{
        border: convertedUrl === activeImageLink 
          ? '2px solid var(--leaf-green)' 
          : '2px solid var(--icons-primary-blue-dark)'
      }}
    >
      {imageUrl ? (
        <Image
          src={convertedUrl}
          alt={altText}
          className={styles.img}
          width={width}
          height={height}
          onClick={() => setactiveImageUrl(convertedUrl)}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <p>Image not available</p>
      )}
    </div>
  );
};

export default GalleryCard;
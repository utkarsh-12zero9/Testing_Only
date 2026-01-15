import { useEffect, useState } from "react";
import styles from "./Socials.module.css";
import { useAppSelector } from "@/app/Redux/hooks";
import { selectBusinessData } from "@/app/Redux/slice/businessSlice/BusinessData";
import location from '../../icons/location.svg'
import phone from '../../icons/phone.svg'
import mail from '../../icons/mail.svg'
import Image from "next/image";

async function getAddress(lat?: number, lon?: number): Promise<string> {
  if (lat === undefined || lon === undefined) return "Location not available";

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response: Response = await fetch(url, {
      headers: {
        "User-Agent": "YourAppName/1.0 (your@email.com)", // 🔹 Required for OpenStreetMap API
      },
    });

    if (!response.ok) throw new Error("Failed to fetch location");

    const data: { display_name?: string; error?: string } = await response.json();

    return data.display_name || "Location not found";
  } catch (error) {
    console.error("Fetch error:", error);
    return "Error fetching location";
  }
}


interface BusinessData {
  location?: [number, number];
  phone?: string;
  email?: string;
}

function Socials() {
  const [address, setAddress] = useState<string>("Fetching location...");
  const businessData = useAppSelector(selectBusinessData) as BusinessData | null;
  
  useEffect(() => {
    const fetchAddress = async () => {
      if (businessData?.location) {
        const location = await getAddress(businessData?.location[0], businessData?.location[1]);
        setAddress(location);
      } else {
        setAddress("Lucknow, Uttar Pradesh");
      }
    };

    fetchAddress();
  }, [businessData]);

  return (
    <div className={styles.socials}>
      <div>
        <div className={styles.imageFrame}>
          <Image src={location} alt="Location Icon" width={12} height={12}/>
        </div>
        <hr className={styles.verticalDivider} />
        <p>{address}</p>
      </div>
      <div>
        <div className={styles.imageFrame}>
          <Image src={phone} alt="Phone Icon" width={12} height={12}/>
        </div>
        <hr className={styles.verticalDivider} />
        <p>{businessData?.phone || "+91 70078 81594"}</p>
      </div>
      <div>
        <div className={styles.imageFrame}>
          <Image src={mail} alt="Mail Icon" width={12} height={12}/>
        </div>
        <hr className={styles.verticalDivider} />
        <p>{businessData?.email || "Business@membes.in"}</p>
      </div>
    </div>
  );
}

export default Socials;

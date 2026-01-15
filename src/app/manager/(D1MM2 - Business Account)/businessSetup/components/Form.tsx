import styles from './Form.module.css'
import infoIcon from '../icons/info.svg'

import CheckBox from "@/globalComponents/inputs/checkBox/CheckBox";
import RoleDropdown from "@/globalComponents/inputs/Dropdown/Dropdown";
import InputBox from "@/globalComponents/inputs/inputBox/InputBox";
import PhoneInput from '@/globalComponents/inputs/phoneInputBox/PhoneInput';
import TextArea from "@/globalComponents/inputs/textArea/TextArea";
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';

import { useCallback, useState } from "react";
import Image from 'next/image';
import TimeSlot from '@/globalComponents/inputs/TimeSlot/TimeSlot';
import { FormDataType, FormErrorsType } from '../utils/types';
import { isGSTOptional, validateField, validateForm } from '../utils/validation';
import createBusinessProfile from '../utils/api';
import CommonPopup from '@/globalComponents/Popups/Common/CommonPopup';
import { useRouter } from 'next/navigation';
import { BUSINESS_TYPES, BusinessTypeValue, RazorpayBusinessTypes, SERVICES } from '../utils/business-data';
import { CLOSING_HOURS, OPENING_HOURS, STATES, WORKING_DAYS, WORKING_HOURS } from '../utils/form-options';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';
import { useManagerDispatch, useManagerSelector } from '@/app/manager/Redux/hooks';
import { selectManagerID, updateManager } from '@/app/manager/Redux/slice/manager-slice';
import { businessCreated } from '@/app/manager/Redux/slice/business-slice';
import GSTInputBox from '@/globalComponents/inputs/GSTInputBox/GSTInputBox';

type FormStatus = "initial" | "loading" | "success" | "error" | "fixing-errors"
export default function Form() {
  const router = useRouter();
  const managerID = useManagerSelector(selectManagerID);
  const dispatch = useManagerDispatch();
  const [formStatus, setFormStatus] = useState<FormStatus>("initial");
  const [formData, setFormData] = useState<FormDataType>({
    brandName: "",
    businessName: "",
    businessType: BusinessTypeValue.Gym,
    gstNumber: "",
    businessCategory: "",
    description: "",
    keyServices: [],
    tagline: "",
    workingHours: [
      { opening: "01:00 AM", closing: "02:00 AM" }
    ],
    workingDays: [],
    maxCapacity: "",
    receptionNumber: "",
    officialEmail: "",
    addressLine1: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    addressLine2: "",
    referralCode: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrorsType>();
  const gstOptional = isGSTOptional(formData.businessCategory);

  const handleChange = useCallback(function (payload: { name: string; value: any; type?: string; }) {
    const name = payload.name as keyof FormDataType;
    const { value } = payload;
    const errors: FormErrorsType = {};

    setFormData((prev) => {
      const newFormData: FormDataType = { ...prev };
      newFormData[name] = value;

      // reset services when business type changes
      if (name === 'businessType') {
        newFormData.keyServices = [];
      }
      if (name === 'businessCategory' && isGSTOptional(newFormData.businessCategory) && !newFormData.gstNumber) {
        errors.gstNumber = "";
      }
      errors[name] = validateField(name, newFormData);
      return newFormData;
    });

    setFormErrors((prev) => ({
      ...prev,
      ...errors
    }));

  }, []);

  function applyRefrel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (formStatus === "loading") return;
    let errors = validateForm(formData);
    if (errors) {
      setFormStatus("error");
      setFormErrors(errors);
      return;
    }
    try {
      setFormStatus("loading");
      const [error, data] = await createBusinessProfile(formData, managerID as string);

      if (error) {
        setFormStatus("error");
        setFormErrors(error);
      } else {
        dispatch(updateManager({ accCreated: 2 }));
        if (data.business) {
          dispatch(businessCreated(data));
        } else {
          window.location.href = '/manager/dashboard';
        }
        setFormStatus("success");
      }
    } catch (error: any) {
      setFormStatus("error");
      setFormErrors({ message: error.message || error });
    }
  }

  return (
    <form className={styles.form} autoComplete='off'>
      {
        formStatus === "loading" &&
        <LoadingPage />
      }
      {
        formStatus === "success" &&
        <CommonPopup
          title="Business Added!"
          buttonText="Done"
          variant="success"
          onClick={() => router.push('/manager/dashboard')}
        >Congratulations! Your Business Details has been updated.</CommonPopup>
      }
      {
        formStatus === "error" &&
        <CommonPopup
          title="Failed to Add Business!"
          buttonText="Close"
          variant="warning"
          onClick={() => setFormStatus('fixing-errors')}
          onOutsideClick={() => setFormStatus('fixing-errors')}
        >{formErrors?.message || "Something went wrong. Please try again."}</CommonPopup>
      }
      <InputBox
        name="brandName"
        value={formData.brandName}
        error={formErrors?.brandName || ''}
        onChange={handleChange}
        label='Brand Name'
        placeholder='Enter the name of your Brand'
      />
      <InputBox
        name="businessName"
        value={formData.businessName}
        error={formErrors?.businessName || ''}
        onChange={handleChange}
        label='Legal Business Name'
        placeholder='Enter the name of your Business'
      />
      <RoleDropdown
        name="businessCategory"
        value={formData.businessCategory}
        options={RazorpayBusinessTypes}
        error={formErrors?.businessCategory || ''}
        onChange={handleChange}
        label='Business Category'
        placeholder='Select the Category of your Business'
      />
      <GSTInputBox
        name="gstNumber"
        value={formData.gstNumber}
        error={formErrors?.gstNumber || ''}
        onChange={handleChange}
        label='GST Number'
        placeholder='_____ - _____-_____'
        optional={gstOptional ? 'optional' : ''}
      />
      <RoleDropdown
        name="businessType"
        value={formData.businessType}
        options={BUSINESS_TYPES}
        error={formErrors?.businessType || ''}
        onChange={handleChange}
        label='Business Type'
        placeholder='Select the category of your business'
      />
      <TextArea
        name="description"
        value={formData.description}
        error={formErrors?.description || ''}
        onChange={handleChange}
        label='Add Description'
        placeholder='Enter Brief Description about Business'
        optional='optional'
      />
      <TextArea
        name="tagline"
        value={formData.tagline}
        error={formErrors?.tagline || ''}
        onChange={handleChange}
        label='Choose your Business Tagline'
        placeholder='Enter a Catchy & Descriptive tagline about Business'
      />
      <CheckBox
        name="keyServices"
        value={formData.keyServices}
        error={formErrors?.keyServices}
        onChange={handleChange}
        label="Key Services (select atleast four options)"
        options={SERVICES[formData.businessType]}
      />
      <TimeSlot
        name='workingHours'
        value={formData.workingHours}
        onChange={handleChange}
        openingOptions={OPENING_HOURS}
        closingOptions={CLOSING_HOURS}
        label='Opening hours'
      />
      <CheckBox
        name="workingDays"
        value={formData.workingDays}
        error={formErrors?.workingDays}
        onChange={handleChange}
        label="Working Days"
        options={WORKING_DAYS}
      />
      <InputBox
        name="maxCapacity"
        value={formData.maxCapacity}
        error={formErrors?.maxCapacity}
        onChange={handleChange}
        label='Maximum Capacity'
        placeholder='Maximum Capacity per slot'
      />

      <section className={styles.sectionBreak}>
        <h2 >Let Customer Reach out to you</h2>
        <hr />
        <p>Do provide accurate information to help the customers reach out to you easily.</p>
      </section>

      <PhoneInput
        name="receptionNumber"
        value={formData.receptionNumber}
        error={formErrors?.receptionNumber}
        onChange={handleChange}
        code="+91"
      />
      <InputBox
        name="officialEmail"
        value={formData.officialEmail}
        error={formErrors?.officialEmail}
        onChange={handleChange}
        label='Email'
        placeholder='user@email.com'
      />
      <InputBox
        name="addressLine1"
        value={formData.addressLine1}
        error={formErrors?.addressLine1}
        onChange={handleChange}
        label='Address Line 1 '
        placeholder='Enter or Pin the Address'
      />
      <InputBox
        name="addressLine2"
        value={formData.addressLine2}
        error={formErrors?.addressLine2}
        onChange={handleChange}
        label='Address Line 2'
        placeholder='Enter the Colony Name, Sector or Block'
      />
      <section className='grid grid-cols-2 gap-2.5 items-start'>
        <InputBox
          name="country"
          value={formData.country}
          error={formErrors?.country}
          onChange={handleChange}
          label='Country'
          placeholder='Enter Country'
          readOnly={true}
        />
        <RoleDropdown
          name="state"
          value={formData.state}
          options={STATES}
          error={formErrors?.state || ''}
          onChange={handleChange}
          label='State'
          placeholder='Select the state'
        />
        <InputBox
          name="city"
          value={formData.city}
          error={formErrors?.city}
          onChange={handleChange}
          label='City'
          placeholder='Enter City'
        />
        <InputBox
          name="pincode"
          value={formData.pincode}
          error={formErrors?.pincode}
          onChange={handleChange}
          label='PIN Code'
          placeholder='______'
        />
      </section>

      <section className={styles.refrelSection}>
        <InputBox
          name="referralCode"
          value={formData.referralCode}
          error={formErrors?.referralCode}
          onChange={handleChange}
          label='Have a Referral? (Optional)'
          placeholder='___ - ____'
        />
        <PrimaryButton onClick={applyRefrel}>Apply</PrimaryButton>
      </section>

      <section className={styles.tncSection}>
        <Image src={infoIcon} alt='info icon' />
        <p>By clicking the Update button, you'll agree to the T&C.</p>
      </section>

      <PrimaryButton className='w-full' onClick={handleSubmit} type="submit">Update</PrimaryButton>
    </form>
  )
};
'use client'

import styles from './Form.module.css';
import { useCallback, useEffect, useState } from 'react';

import { FormDataType, FormErrorsType } from '../types';
import { validateField, validateForm } from '../data/validation';
import { INITIAL_FORM_DATA } from '../data/initial-form-data';
import { GENDER, LANGUAGES, ROLES, STATES } from '../data/form-data';

// input components
import InputBox from '@/globalComponents/inputs/inputBox/InputBox';
import PhoneInput from '@/globalComponents/inputs/phoneInputBox/PhoneInput';
import RadioBox from '@/globalComponents/inputs/radioBox/RadioBox';
import { DatePicker } from '@/globalComponents/inputs/DatePicker/DatePicker';
import Dropdown from '@/globalComponents/inputs/Dropdown/Dropdown';
import CheckBox from '@/globalComponents/inputs/checkBox/CheckBox';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import CheckMark from '@/globalComponents/inputs/CheckMark/CheckMark';
import CommonPopup from '@/globalComponents/Popups/Common/CommonPopup';
import { useRouter } from 'next/navigation';
import createManagerAccount from '../data/api';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';
import { useManagerDispatch, useManagerSelector } from '@/app/manager/Redux/hooks';
import { selectManager, updateManager } from '@/app/manager/Redux/slice/manager-slice';

type FormStatus = "initial" | "loading" | "success" | "error" | "fixing-errors"

export default function Form() {
  const router = useRouter();
  const managerData = useManagerSelector(selectManager);
  const dispatch = useManagerDispatch();
  const [formStatus, setFormStatus] = useState<FormStatus>("initial");
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<FormErrorsType>();

  const handleChange = useCallback(function (payload: { name: string; value: any; type?: string; }) {
    const name = payload.name as keyof FormDataType;
    const { value } = payload;
    let error: string | undefined;

    setFormData((prev) => {
      const newFormData: FormDataType = { ...prev };
      (newFormData[name] as any) = value;

      error = validateField(name, newFormData[name]);
      return newFormData;
    });

    setFormErrors((prev) => ({
      ...prev,
      [name]: error || '',
    }));

  }, []);

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
      const [error, data] = await createManagerAccount(formData, managerData?.ID as string);

      if (error) {
        setFormStatus("error");
        setFormErrors({ message: error });
      } else {
        dispatch(updateManager(data));
        setFormStatus("success");
      }
    } catch (error: any) {
      setFormStatus("error");
      setFormErrors({ message: error.message || error });
    }
  }

  // set full name from manager data
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullName: managerData?.fullName || '',
    }));
  }, [managerData?.fullName]);

  return (
    <form className={styles.form}>
      {
        formStatus === "loading" &&
        <LoadingPage />
      }
      {
        formStatus === "success" &&
        <CommonPopup
          title="Account Created!"
          buttonText="Done"
          variant="success"
          onClick={(e: any) => { e.preventDefault(); router.push('/manager/dashboard'); }}
        >Congratulations! Your Account Details has been updated.</CommonPopup>
      }
      {
        formStatus === "error" &&
        <CommonPopup
          title="Failed to Create Account!"
          buttonText="Close"
          variant="warning"
          onClick={(e: any) => { e.preventDefault(); setFormStatus('fixing-errors') }}
          onOutsideClick={(e) => setFormStatus('fixing-errors')}
        >
          {formErrors?.message || "Something went wrong. Please try again."}
        </CommonPopup>
      }
      <InputBox
        name="fullName"
        value={formData.fullName}
        error={formErrors?.fullName}
        onChange={handleChange}
        label="Full Name"
        placeholder="John Doe"
      />
      <PhoneInput
        name="contactNumber"
        value={formData.contactNumber}
        error={formErrors?.contactNumber}
        onChange={handleChange}
        code="+91"
      />
      <RadioBox
        name="gender"
        value={formData?.gender}
        error={formErrors?.gender}
        onChange={handleChange}
        options={GENDER}
        label="Select Gender"
      />
      <DatePicker
        name="dob"
        date={formData.dob}
        error={formErrors?.dob}
        onChange={handleChange}
        label="Date of Birth"
      />
      <Dropdown
        name="role"
        value={formData.role}
        error={formErrors?.role}
        onChange={handleChange}
        placeholder="What defines you best?"
        options={ROLES}
        label="What defines you best?"
      />
      <InputBox
        name="addressLine1"
        value={formData.addressLine1}
        error={formErrors?.addressLine1}
        onChange={handleChange}
        optional="Or pin on map"
        label="Address Line 1"
        placeholder="Enter or Pin the Address"
      />
      <InputBox
        name="addressLine2"
        value={formData.addressLine2}
        onChange={handleChange}
        optional="Optional"
        label="Address Line 2"
        placeholder="Enter your colony or locality"
      />

      <div className="flex gap-x-2">
        <div className="w-full">
          <InputBox
            name="country"
            value={formData.country}
            error={formErrors?.country}
            onChange={handleChange}
            label="Country"
            placeholder="Enter Country"
            readOnly={true}
          />
        </div>
        <div className="w-full">
          <Dropdown
            name="state"
            value={formData.state}
            options={STATES}
            error={formErrors?.state || ''}
            onChange={handleChange}
            label='State'
            placeholder='Select the state'
          />
        </div>
      </div>

      <div className="flex gap-x-2">
        <div className="w-full">
          <InputBox
            name="city"
            value={formData.city}
            error={formErrors?.city}
            onChange={handleChange}
            label="City"
            placeholder="Enter City"
          />
        </div>
        <div className="w-full">
          <InputBox
            name="pincode"
            value={formData.pincode}
            error={formErrors?.pincode}
            onChange={handleChange}
            label="PIN Code"
            placeholder="_ _ _ _ _ _"
          />
        </div>
      </div>

      <CheckBox
        name="languagePreference"
        value={formData.languagePreference}
        options={LANGUAGES}
        onChange={handleChange}
        label="Select Language"
        optional="Optional"
      />

      <div className={styles.checkbox}>
        <CheckMark
          name="tnc1"
          value={!!formData.tnc1}
          error={formErrors?.tnc1}
          onChange={handleChange}
        />
        <label htmlFor="tnc1" style={{ color: formErrors?.tnc1 ? 'var(--bodytext-warning-red) !important' : '' }}>I accept the terms and conditions and acknowledge that I have read and agree to abide by the company's policies and guidelines.</label>
      </div>
      <div className={styles.checkbox}>
        <CheckMark
          name="tnc2"
          value={!!formData.tnc2}
          error={formErrors?.tnc2}
          onChange={handleChange}
        />
        <label htmlFor="tnc2" style={{ color: formErrors?.tnc2 ? 'var(--bodytext-warning-red) !important' : '' }}>I give consent to receive promotional communications from the company.</label>
      </div>
      <br />
      <PrimaryButton className="w-full" onClick={handleSubmit}>Create Account</PrimaryButton>
    </form>
  )
};

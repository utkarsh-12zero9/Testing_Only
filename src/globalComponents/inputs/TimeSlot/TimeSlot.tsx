import styles from "./TimeSlot.module.css";

import Image from "next/image";
import plusIcon from './icons/plus.svg';
import minusIcon from './icons/minus.svg';

import { OptionType, SlotType } from "./utils/types";
import Slot from "./components/Slot";
import { SharedInputComponentProps } from "../types";
import { memo } from "react";

type TimeSlotProps = Omit<SharedInputComponentProps, "value" | "onChange"> & {
  value: SlotType[];
  openingOptions: OptionType[];
  closingOptions?: OptionType[];
  onChange: ({ name, value, type }: { name: string, value: SlotType[], type: string }) => void;
}
function TimeSlot({ name, value, onChange, openingOptions, closingOptions, label }: TimeSlotProps) {

  function handleChange(index: number, field: 'opening' | 'closing', newValue: string) {
    const newSlots = [...value];

    // if same as previous value, return
    if (newSlots[index][field] === newValue) return;

    newSlots[index] = { ...newSlots[index], [field]: newValue };
    onChange({ name, value: newSlots, type: 'time-slot' });
  }

  function handleAddSlot(index: number) {
    const updated = [...value];
    updated.splice(index + 1, 0, value[index]);
    onChange && onChange({ name, value: updated, type: 'time-slot' });
  };

  function handleRemoveSlot(index: number) {
    const updated = value.filter((_, i) => i !== index);
    onChange && onChange({ name, value: updated, type: 'time-slot' });
  };

  return (
    <div>
      <label className={styles.label}>{label}</label>
      <section>
        {
          value?.map((item, index) => (
            <div key={index}>
              <div className={styles.timeSlotContainer}>
                <Slot
                  options={openingOptions}
                  selected={item.opening}
                  label="Opening"
                  onchange={(value) => handleChange(index, 'opening', value)}
                  error={!!item?.error}
                />
                <Slot
                  options={closingOptions || openingOptions}
                  selected={item.closing}
                  label="Closing"
                  onchange={(value) => handleChange(index, 'closing', value)}
                  error={!!item?.error}
                />
                <div className={styles.buttons}>
                  <button type="button" onClick={() => handleAddSlot(index)}>
                    <Image src={plusIcon} alt="plus icon" />
                  </button>
                  {
                    index !== 0 && (
                      <button type="button" onClick={() => handleRemoveSlot(index)}>
                        <Image src={minusIcon} alt="minus icon" />
                      </button>
                    )
                  }
                </div>
              </div>
              {item?.error && <p className={styles.errorText}>{item?.error}</p>}
            </div>
          ))
        }
      </section>
    </div>
  )
};

export default memo(TimeSlot);
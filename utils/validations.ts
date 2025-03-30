import { Medicine } from "@/models/Medicine";
import { MedFormErrors } from "@/models/MedFormErrors.model";

export const validateMedForm = (formData: Medicine): MedFormErrors => {
    let errors: MedFormErrors = {
        name: '',
        medType: '',
        dose: '',
        whenToTake: '',
        startDate: '',
        endDate: '',
        reminderTime: '',
    };

    if (!formData.name.trim()) errors.name = 'Medicine name is required';
    if (!formData.medType.trim()) errors.medType = 'Medicine type is required';
    if (!formData.dose.trim()) errors.dose = 'Dose information is required';
    if (!formData.whenToTake.trim()) errors.whenToTake = 'Frequency is required';
    if (!formData.startDate) errors.startDate = 'Start date is required';
    if (!formData.endDate) errors.endDate = 'End date is required';
    else if (formData?.endDate < formData?.startDate) errors.endDate = 'End date must be after start date';
    if (!formData.reminderTime) errors.reminderTime = 'Reminder time is required';


    // Remove empty error fields
    Object.keys(errors).forEach(key => {
        if (!errors[key as keyof MedFormErrors]) {
            delete errors[key as keyof MedFormErrors];
        }
    });

    return errors;
};
import { useState, useEffect } from "react";

const useForm = (props) => {
    const { init, validator, onSubmit } = props;

    const [values, setValues] = useState({ ...init });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dirty, setDirty] = useState(false);

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChecked = (e, type) => {
        if (type) {
            setValues((prev) => {
                const currentList = e.target.name;
                const currentCheckbox = e.target.value;

                const temp = prev[currentList];
                const isSelected = temp.includes(currentCheckbox);

                return isSelected
                    ? {
                          ...prev,
                          [currentList]: [
                              ...temp.filter((el) => el !== currentCheckbox),
                          ],
                      }
                    : {
                          ...prev,
                          [currentList]: [...temp, currentCheckbox],
                      };
            });
            return;
        }

        setValues((prev) => ({
            ...prev,
            [e.target.name]: !prev[e.target.name].checked,
        }));
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({
            ...prev,
            [e.target.name]: true,
        }));
    };

    const resetForm = () => {
        setErrors(validator(init));
        setTouched({});
        setValues(init);
        setDirty(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isErrors = Object.keys(errors).length;
        if (isErrors) {
            setTouched(errors);
            setDirty(true);
            return;
        }

        setIsSubmitting(true);

        onSubmit(values);
    };

    useEffect(() => {
        setErrors(validator(values));
    }, [values]);

    useEffect(() => {
        if (dirty) {
            if (!Object.keys(errors).length) {
                setDirty(false);
            }
        }
    }, [errors]);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        setIsSubmitting,
        dirty,
        resetForm,
        handleChange,
        handleChecked,
        handleBlur,
        handleSubmit,
    };
};

export default useForm;

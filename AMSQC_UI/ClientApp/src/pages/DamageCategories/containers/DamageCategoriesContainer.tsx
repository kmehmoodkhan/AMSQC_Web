import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { openNotificationWithWarning } from '../../Shared/Components/notification';
import SelectDamageCategories from '../components/SelectDamageCategories';

export default function DamageCategoriesContainer() {
    //General Hooks
    const history = useHistory();

    //useState
    const [selectedCategory, setSelectedCategory] = useState(0);

    //events

    const onSelectCategory = (value: number) => {
        setSelectedCategory(value);
    };

    const onContinue = () => {
        if (selectedCategory > 0) {
            history.push({
                pathname: '/inspection',
                state: { category: selectedCategory },
            });
        } else {
            openNotificationWithWarning('Please select a category!', 'Warning');
        }
    };

    return (
        <SelectDamageCategories
            onContinue={onContinue}
            selectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
        />
    );
}

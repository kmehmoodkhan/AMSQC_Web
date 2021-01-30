import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
        history.push('/category-one');
    };

    return (
        <SelectDamageCategories
            onContinue={onContinue}
            selectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
        />
    );
}

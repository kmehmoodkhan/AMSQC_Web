import React from 'react';
import CategoryCard from './CategoryCard';
type Props = {
    onContinue: any;
    selectCategory: any;
    selectedCategory: any;
};
export default function SelectDamageCategories({ onContinue, selectCategory, selectedCategory }: Props) {
    return (
        <div className="page ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="block-section">
                            <div className="main-title"> Damage Categories </div>
                            <p className="info-text"> Based on vehicle damage select one of the following </p>
                            <div className="damage-categories" style={{ marginTop: '60px' }}>
                                <div className="row justify-content-center">
                                    <CategoryCard
                                        title={'Category One'}
                                        value={1}
                                        paragraph={
                                            <>
                                                <p>All repair types. </p>
                                                <p>Excluding category 2 and 3.</p>
                                            </>
                                        }
                                        onClick={() => selectCategory(1)}
                                        categoryClass={`category1 ${selectedCategory == 1 ? 'active' : ''}`}
                                    />
                                    <CategoryCard
                                        title={'Category One Plus'}
                                        value={2}
                                        paragraph={
                                            <>
                                                <p>Any vehicle that has had a welded panel replaced.</p>
                                            </>
                                        }
                                        onClick={() => selectCategory(2)}
                                        categoryClass={`category2 ${selectedCategory == 2 ? 'active' : ''}`}
                                    />
                                    <CategoryCard
                                        title={'Category One & Two Plus'}
                                        value={3}
                                        paragraph={
                                            <>
                                                <p>
                                                    Any vehicle that has a repair of any kind to a chassis rail or
                                                    skirt.
                                                </p>
                                                <p>
                                                    Any vehicle that has any type of suspension, engine, SRS or safety
                                                    system works completed.
                                                </p>
                                            </>
                                        }
                                        onClick={() => selectCategory(3)}
                                        categoryClass={`category3 ${selectedCategory == 3 ? 'active' : ''}`}
                                    />
                                </div>
                            </div>
                            <div className="buttons" style={{ paddingBottom: '0px', marginTop: '40px' }}>
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    className="btn btn-primary btn-lg btn-wide"
                                    onClick={onContinue}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

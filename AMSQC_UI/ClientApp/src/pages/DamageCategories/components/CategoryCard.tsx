import React from 'react';
type Props = {
    title: string;
    paragraph: any;
    value: number;
    onClick: any;
    categoryClass: string;
};
export default function CategoryCard({ title, paragraph, value, onClick, categoryClass }: Props) {
    return (
        <div className="col-lg-4 col-md-4 col-sm-4" onClick={onClick}>
            <div className={`card ${categoryClass}`}>
                <div className="card-header">
                    <div className="value">{value}</div>
                </div>
                <div className="card-body">
                    <h5>{title}</h5>
                    {paragraph}
                </div>
            </div>
        </div>
    );
}

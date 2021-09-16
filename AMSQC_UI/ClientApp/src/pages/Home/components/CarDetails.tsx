import React from 'react';
import { QuoteDetailType } from '../../../common/types';

type Props = {
    car: QuoteDetailType;
};
export default function QuoteDetails({ car }: Props) {
    return (
        <div className="car-details">
            <div className="card">
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th colSpan={2}> Car Details</th>
                            </tr>
                            <tr>
                                <td>
                                    <div className="name"> Make</div>
                                </td>
                                <td>{car.company}</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="name"> Model</div>
                                </td>
                                <td>{car.model}</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="name"> Colour</div>
                                </td>
                                <td>{car.color}</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="name"> Registration</div>
                                </td>
                                <td>{car.registration}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

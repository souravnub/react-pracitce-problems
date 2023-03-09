import React, { useEffect, useState } from "react";

const Counter = ({
    counterId,
    // in ms
    addCustomer,
    setCustomers,
    customers,
    singleItemProcessingTime = 1000,
    setTotalProcessingTime,
    totalProcessingTime,
}) => {
    // const [customers, setCustomers] = useState([4, 4]);
    // const [totalProcessingTime, setTotalProcessingTime] = useState(0);

    useEffect(() => {
        let customerClearenceInterval;
        if (customers.length > 0) {
            customerClearenceInterval = setInterval(() => {
                let arr = [...customers];
                if (arr.length === 1 && arr[0] === 0) {
                    return setCustomers(counterId, []);
                }

                if (arr[0] === 0) {
                    arr = arr.filter((customer, idx) => idx !== 0);
                }
                arr[0] -= 1;

                setCustomers(counterId, arr);
            }, singleItemProcessingTime);
        }

        return () => {
            customerClearenceInterval &&
                clearInterval(customerClearenceInterval);
        };
    }, [customers]);

    useEffect(() => {
        let time = 0;
        customers.map((items) => {
            time += items * singleItemProcessingTime;
        });
        setTotalProcessingTime(counterId, time);
    }, [customers, singleItemProcessingTime]);

    return (
        <div>
            <div className="bg-gray-400 px-8 py-2 max-w-max border-2 rounded-md mb-3">
                <span className="font-medium text-xl">
                    {totalProcessingTime / 1000} s
                </span>
            </div>
            <div className="flex items-center flex-col gap-1">
                {customers.map((customer, idx) => {
                    return (
                        <span
                            key={idx}
                            className="bg-red-500  aspect-square px-4 flex items-center justify-center  rounded-full">
                            {customer}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default Counter;

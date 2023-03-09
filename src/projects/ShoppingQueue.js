import React, { useEffect, useRef, useState } from "react";
import Counter from "../components/Shopping Queue/Counter";

const initialCounters = [
    {
        counterId: 1,
        processingTime: 1000,
        customers: [],
        totalProcessingTime: undefined,
    },
    {
        counterId: 2,
        processingTime: 2000,
        customers: [],
        totalProcessingTime: undefined,
    },
    {
        counterId: 3,
        processingTime: 2000,
        customers: [],
        totalProcessingTime: undefined,
    },
    {
        counterId: 4,
        processingTime: 2000,
        customers: [],
        totalProcessingTime: undefined,
    },
    {
        counterId: 5,
        processingTime: 2000,
        customers: [],
        totalProcessingTime: undefined,
    },
];

const ShoppingQueue = () => {
    const inputRef = useRef();
    const [counters, setCounters] = useState(initialCounters);

    const setCustomers = (counterId, arr) => {
        setCounters((currentCounters) => {
            return currentCounters.map((counter) => {
                if (counter.counterId === counterId) {
                    return { ...counter, customers: arr };
                }
                return counter;
            });
        });
    };
    const setTotalProcessingTime = (counterId, totalProcessingTime) => {
        setCounters((currentCounters) => {
            return currentCounters.map((counter) => {
                if (counter.counterId === counterId) {
                    return { ...counter, totalProcessingTime };
                }
                return counter;
            });
        });
    };

    const handleAddCustomerToCounter = (e) => {
        e.preventDefault();
        let leastProcessingTime = counters[0].totalProcessingTime;
        let counterWithLeastProcessingTime;

        // if all counters are empty then push customer to the most efficient counter (counter with least processing time for single item)
        const countersStateArr = counters.map((counter) => {
            if (counter.customers.length === 0) {
                return true;
            } else {
                return false;
            }
        });

        const didFoundBusyCounter = countersStateArr.find(
            (counterState) => counterState === false
        );

        if (didFoundBusyCounter === undefined) {
            let mostEfficientCounter = counters[0];
            counters.forEach((counter) => {
                if (counter.processingTime < mostEfficientCounter) {
                    mostEfficientCounter = counter;
                }
            });
            setCustomers(mostEfficientCounter.counterId, [
                parseInt(inputRef.current.value),
            ]);
            return;
        }

        // push customer to the counter that currently have the least total processing time
        counters.forEach((counter) => {
            if (counter.totalProcessingTime <= leastProcessingTime) {
                counterWithLeastProcessingTime = counter;
            }
        });

        setCustomers(counterWithLeastProcessingTime.counterId, [
            ...counterWithLeastProcessingTime.customers,
            parseInt(inputRef.current.value),
        ]);
    };

    return (
        <div className="flex  items-center py-3 flex-col  gap-4">
            <form onSubmit={handleAddCustomerToCounter} className="flex gap-3">
                <input
                    type="number"
                    ref={inputRef}
                    min={1}
                    className="bg-gray-200 border-2"
                />
                <button className="bg-slate-100 px-2 py-.5">Submit</button>
            </form>

            <div className="flex gap-5">
                {counters.map(
                    ({
                        counterId,
                        processingTime,
                        customers,
                        totalProcessingTime,
                    }) => {
                        return (
                            <Counter
                                key={counterId}
                                counterId={counterId}
                                totalProcessingTime={totalProcessingTime}
                                singleItemProcessingTime={processingTime}
                                customers={customers}
                                setCustomers={setCustomers}
                                setTotalProcessingTime={setTotalProcessingTime}
                            />
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default ShoppingQueue;

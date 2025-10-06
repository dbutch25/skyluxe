import RequestForm from "@/components/elements/RequestForm";
import React from "react";

const RequestQuote = () => {
    return (
        <>
            <div className="text-3xl font-julius text-primary-950 text-center pt-40">
                <h1 className="inline border-b-2 border-primary-800">Request A Quote</h1>
            </div>
            <RequestForm/>
        </>
    )
}

export default RequestQuote;
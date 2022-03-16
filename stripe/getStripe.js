import {loadStripe} from '@stripe/stripe-js';

let stripePromise = null;

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe("pk_test_51KcSulEvnpxSbo9jerol4UgWrCCdBTIcUSUytho8spOhrui1jfYxrVK1pmZHVYMBIAWbq0UjSLwHSLrxKfDcyrPd00RiUeWEhH");
    }
    return stripePromise
}
export default getStripe


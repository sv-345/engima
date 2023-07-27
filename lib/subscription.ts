import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

const  DAY_IN_MS = 86_400_00;

export const checkSubscription = async () => {
    const { userId } = auth();

    if(!userId) {
        return false;
    }

    const userSubcription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    });

    if(!userSubcription) {
        return false;
    }

    const isValid = 
        userSubcription.stripePriceId && 
        userSubcription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid;
};
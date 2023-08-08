import getClient from "./lib/api";

export default {
    createCustomer(customer_data, callback) {
        return getClient()
            .post("/customers/create-customer/", {
                headers: {
                    "Content-Type": "application/json"
                },
                customer_data
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    selectMealPlan(email, meal_plan, callback) {
        return getClient()
            .post("/customers/select-mealplan/", {
                headers: {
                    "Content-Type": "application/json"
                },
                email,
                meal_plan
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    completeSignUp(customer, callback) {
        return getClient()
            .post("/customers/complete-signup/", {
                headers: {
                    "Content-Type": "application/json"
                },
                customer
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    loginCustomer(customer, callback) {
        return getClient()
            .post("/customers/login/", {
                headers: {
                    "Content-Type": "application/json"
                },
                customer
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    fetchMenu(callback) {
        return getClient()
            .get("/restaurants/get-plans/", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getPlan(plan_id, callback) {
        return getClient()
            .get("/restaurants/get-plan/" + plan_id + "/", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getCurrentDishes(email, callback) {
        return getClient()
            .get("/weeklyorder/get-currentplan/", {
                params: {
                    email: email
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getUpcomingDishes(email, callback) {
        return getClient()
            .get("/weeklyorder/get-upcomingplans/", {
                params: {
                    email: email
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    handleSkip(email, weeklyorder_id, callback) {
        return getClient()
            .get("/weeklyorder/handle-skip/", {
                params: {
                    email: email,
                    weeklyorder_id: weeklyorder_id
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    handleUnskip(email, weeklyorder_id, callback) {
        return getClient()
            .get("/weeklyorder/handle-unskip/", {
                params: {
                    email: email,
                    weeklyorder_id: weeklyorder_id
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getAppState(customer_id, callback) {
        return getClient()
            .get("/customers/get-appstate/" + customer_id, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    saveDishesChange(email, weeklyorder_id, dish_list, callback) {
        return getClient()
            .post("/weeklyorder/save-disheschange/", {
                headers: {
                    "Content-Type": "application/json"
                },
                email,
                weeklyorder_id,
                dish_list
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getAllUserInformation(email, callback) {
        return getClient()
            .get("/customers/get-alluserinformation/", {
                params: {
                    email: email
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getSubscriptionsInformation(email, callback) {
        return getClient()
            .get("/customers/get-subscriptionsinformation/", {
                params: {
                    email: email
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getDeliveryInformation(email, callback) {
        return getClient()
            .get("/customers/get-deliveryinformation/", {
                params: {
                    email: email
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getAccountInformation(email, callback) {
        return getClient()
            .get("/customers/get-accountinformation/", {
                params: {
                    email: email
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getPaymentInformation(email, callback) {
        return getClient()
            .get("/customers/get-paymentinformation/", {
                params: {
                    email: email
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    getDeliveryHistory(email, callback) {
        return getClient()
            .get("/weeklyorder/get-deliveryhistory/", {
                params: {
                    email: email
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    updateSubscription(email, updated_values, callback) {
        return getClient()
            .post("/customers/update-subscription/", {
                headers: {
                    "Content-Type": "application/json"
                },
                email,
                updated_values
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    updateAccount(email, updated_values, callback) {
        return getClient()
            .post("/customers/update-account/", {
                headers: {
                    "Content-Type": "application/json"
                },
                email,
                updated_values
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },

    updateDelivery(email, updated_values, callback) {
        return getClient()
            .post("/customers/update-delivery/", {
                headers: {
                    "Content-Type": "application/json"
                },
                email,
                updated_values
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    },
    
    updatePayment(email, updated_values, callback) {
        return getClient()
            .post("/customers/update-payment/", {
                headers: {
                    "Content-Type": "application/json"
                },
                email,
                updated_values
            })
            .then(res => callback(res, null))
            .catch(res => callback(null, res));
    }
};

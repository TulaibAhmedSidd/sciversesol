import Loading from "@/app/components/Loading";
import RefreshButton from "@/app/components/RefreshButton";
import { checkArrNull } from "@/app/utils/helperFunc";
import React, { useState, useEffect } from "react";

const PlanManagement = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        equipment: [{ name: "", quantity: 1, price: 1 }],
        totalPrice: "",
        description: "",
        applianceSetup: [{ appliance: "", count: 1 }],
    });
    const [formErrors, setFormErrors] = useState({});
    const [editingPlanId, setEditingPlanId] = useState(null);

    // Fetch plans
    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/plan");
            const data = await response.json();
            setPlans(data);
        } catch (error) {
            console.error("Error fetching plans:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    // Handle input change
    const handleInputChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    // Handle equipment or appliance changes
    const handleDynamicChange = (listKey, index, key, value) => {
        const updatedList = [...form[listKey]];
        updatedList[index][key] = value;
        setForm({ ...form, [listKey]: updatedList });
    };

    // Add a new row for equipment or appliances
    const handleAddRow = (listKey) => {
        const newItem =
            listKey === "equipment"
                ? { name: "", quantity: 1, price: 1 }
                : { appliance: "", count: 1 };
        setForm({ ...form, [listKey]: [...form[listKey], newItem] });
    };

    // Remove a row
    const handleRemoveRow = (listKey, index) => {
        const updatedList = [...form[listKey]];
        updatedList.splice(index, 1);
        setForm({ ...form, [listKey]: updatedList });
    };

    // Validate form
    // const validateForm = () => {
    //     const errors = {};
    //     if (!form.name.trim()) errors.name = "Name is required.";
    //     // if (!form.price || isNaN(form.price)) errors.price = "Valid price is required.";
    //     // if (!form.totalPrice || isNaN(form.totalPrice)) errors.totalPrice = "Valid total price is required.";
    //     return errors;
    // };

    const validateForm = () => {
        const errors = {};

        // Validate Plan Name
        if (!form.name.trim()) {
            errors.name = "Name is required.";
        }

        // Validate Equipment: Check if name is provided, quantity must be greater than 1, and price greater than 1
        form.equipment.forEach((item, index) => {
            if (!item.name.trim()) {
                errors[`equipmentName-${index}`] = "Equipment name is required.";
            }
            if (item.quantity < 1) {
                errors[`equipmentQuantity-${index}`] = "Quantity must be greater than 0.";
            }
            if (item.price < 1) {
                errors[`equipmentPrice-${index}`] = "Price must be greater than 0.";
            }
        });

        // Validate Appliances: Check if appliance name is provided and count must be greater than 1
        form.applianceSetup.forEach((item, index) => {
            if (!item.appliance.trim()) {
                errors[`applianceName-${index}`] = "Appliance name is required.";
            }
            if (item.count < 1) {
                errors[`applianceCount-${index}`] = "Count must be greater than 0.";
            }
        });

        return errors;
    };



    // Handle form submission (Create/Update)
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const errors = validateForm();
    //     console.log("im form", form);
    //     // Calculate totalPrice
    //     const totalPrice = form.equipment.reduce(
    //         (sum, item) => sum + item.quantity * item.price,
    //         0
    //     );

    //     if (Object.keys(errors).length) {
    //         console.log("im running", errors)
    //         setFormErrors(errors);
    //         return;
    //     }
    //     let apiData = {
    //         ...form,
    //         totalPrice: totalPrice
    //     }

    //     console.log("im form", form);
    //     setLoading(true);

    //     try {
    //         const method = editingPlanId ? "PUT" : "POST";
    //         const url = editingPlanId ? `/api/plan/${editingPlanId}` : "/api/plan";
    //         await fetch(url, {
    //             method,
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(apiData),
    //         });
    //         fetchPlans();
    //         setForm({
    //             name: "",
    //             equipment: [{ name: "", quantity: 1, price: 1 }],
    //             totalPrice: "",
    //             description: "",
    //             applianceSetup: [{ appliance: "", count: 1 }],
    //         });
    //         setEditingPlanId(null);
    //     } catch (error) {
    //         console.error("Error saving plan:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        console.log("Form errors:", errors);

        if (Object.keys(errors).length) {
            setFormErrors(errors);
            return;
        }

        // Calculate total price
        const totalPrice = form.equipment.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );

        let apiData = {
            ...form,
            totalPrice: totalPrice,
        };

        setLoading(true);
        try {
            const method = editingPlanId ? "PUT" : "POST";
            const url = editingPlanId ? `/api/plan/${editingPlanId}` : "/api/plan";
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(apiData),
            });
            fetchPlans();
            setForm({
                name: "",
                equipment: [{ name: "", quantity: 1, price: 1 }],
                totalPrice: "",
                description: "",
                applianceSetup: [{ appliance: "", count: 1 }],
            });
            setEditingPlanId(null);
            setFormErrors({});  // Clear the form errors

        } catch (error) {
            console.error("Error saving plan:", error);
        } finally {
            setLoading(false); setFormErrors({});  // Clear the form errors

        }
    };


    // Delete a plan
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await fetch(`/api/plan/${id}`, { method: "DELETE" });
            fetchPlans();
        } catch (error) {
            console.error("Error deleting plan:", error);
        } finally {
            setLoading(false);
        }
    };

    // Edit a plan
    const handleEdit = (plan) => {
        setForm(plan);
        setEditingPlanId(plan?._id);
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Plan Management</h1>

            {/* Plan Form */}
            <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded bg-gray-50">
                {/* Plan Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Plan Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter plan name"
                        value={form.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full mt-1 focus:ring-2 focus:ring-indigo-500"
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>

                {/* Description Field */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        placeholder="Enter description"
                        value={form.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full mt-1 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Equipment Section */}
                <div>
                    <h3 className="font-bold">Equipment</h3>
                    {form.equipment.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center flex-wrap mt-2">
                            {/* Equipment Name */}
                            <div className="w-full md:w-1/3">
                                <label htmlFor={`equipment-name-${index}`} className="block text-sm font-medium text-gray-700">Equipment Name</label>
                                <input
                                    type="text"
                                    id={`equipment-name-${index}`}
                                    placeholder="Enter equipment name"
                                    value={item.name}
                                    onChange={(e) => handleDynamicChange("equipment", index, "name", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full mt-1 focus:ring-2 focus:ring-indigo-500"
                                />
                                {formErrors[`equipmentName-${index}`] && <p className="text-red-500 text-sm">{formErrors[`equipmentName-${index}`]}</p>}
                            </div>

                            {/* Equipment Quantity */}
                            <div className="w-full md:w-1/4">
                                <label htmlFor={`equipment-quantity-${index}`} className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    id={`equipment-quantity-${index}`}
                                    min={0}
                                    placeholder="Enter quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleDynamicChange("equipment", index, "quantity", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full mt-1 focus:ring-2 focus:ring-indigo-500"
                                />
                                {formErrors[`equipmentQuantity-${index}`] && <p className="text-red-500 text-sm">{formErrors[`equipmentQuantity-${index}`]}</p>}

                            </div>

                            {/* Equipment Price */}
                            <div className="w-full md:w-1/4">
                                <label htmlFor={`equipment-price-${index}`} className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    id={`equipment-price-${index}`}
                                    min={0}
                                    placeholder="Enter price"
                                    value={item.price}
                                    onChange={(e) => handleDynamicChange("equipment", index, "price", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full mt-1 focus:ring-2 focus:ring-indigo-500"
                                />
                                {formErrors[`equipmentPrice-${index}`] && <p className="text-red-500 text-sm">{formErrors[`equipmentPrice-${index}`]}</p>}

                            </div>

                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveRow("equipment", index)}
                                className="bg-red-500 text-white px-2 py-1 rounded mt-4 md:mt-6"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddRow("equipment")}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Add Equipment
                    </button>
                </div>

                {/* Appliances Section */}
                <div>
                    <h3 className="font-bold mt-6">Appliances</h3>
                    {form.applianceSetup.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center flex-wrap mt-2">
                            {/* Appliance Name */}
                            <div className="w-full md:w-1/3">
                                <label htmlFor={`appliance-name-${index}`} className="block text-sm font-medium text-gray-700">Appliance Name</label>
                                <input
                                    type="text"
                                    id={`appliance-name-${index}`}
                                    placeholder="Enter appliance name"
                                    value={item.appliance}
                                    onChange={(e) => handleDynamicChange("applianceSetup", index, "appliance", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full mt-1 focus:ring-2 focus:ring-indigo-500"
                                />
                                {formErrors[`applianceName-${index}`] && <p className="text-red-500 text-sm">{formErrors[`applianceName-${index}`]}</p>}

                            </div>

                            {/* Appliance Count */}
                            <div className="w-full md:w-1/4">
                                <label htmlFor={`appliance-count-${index}`} className="block text-sm font-medium text-gray-700">Count</label>
                                <input
                                    type="number"
                                    id={`appliance-count-${index}`}
                                    placeholder="Enter count"
                                    min={0}
                                    value={item.count}
                                    onChange={(e) => handleDynamicChange("applianceSetup", index, "count", e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full mt-1 focus:ring-2 focus:ring-indigo-500"
                                />
                                {formErrors[`applianceCount-${index}`] && <p className="text-red-500 text-sm">{formErrors[`applianceCount-${index}`]}</p>}

                            </div>

                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveRow("applianceSetup", index)}
                                className="bg-red-500 text-white px-2 py-1 rounded mt-4 md:mt-6"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddRow("applianceSetup")}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Add Appliance
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
                    disabled={loading}
                >
                    {editingPlanId ? "Update Plan" : "Create Plan"}
                </button>
            </form>
            <div className="flex gap-2 items-center mt-8 mb-4">
                <h3 className="text-xl font-semibold ">Plan List</h3>
                <RefreshButton onClick={fetchPlans} />
            </div>
            {/* <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded bg-gray-50">
                <div>
                    <input
                        type="text"
                        placeholder="Plan Name"
                        value={form.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                </div>
                <div>
                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <h3 className="font-bold">Equipment</h3>
                
                    {form.equipment.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center flex-wrap">
                            <div>

                                <input
                                    type="text"
                                    placeholder="Equipment Name"
                                    value={item.name}
                                    onChange={(e) => handleDynamicChange("equipment", index, "name", e.target.value)}
                                    className="border p-2 rounded flex-1"
                                />
                                {formErrors[`equipmentName-${index}`] && <p className="text-red-500 text-sm">{formErrors[`equipmentName-${index}`]}</p>}
                            </div>
                            <div>

                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleDynamicChange("equipment", index, "quantity", e.target.value)}
                                    className="border p-2 rounded w-20"
                                />
                                {formErrors[`equipmentQuantity-${index}`] && <p className="text-red-500 text-sm">{formErrors[`equipmentQuantity-${index}`]}</p>}
                            </div>
                            <div>

                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => handleDynamicChange("equipment", index, "price", e.target.value)}
                                    className="border p-2 rounded w-20"
                                />
                                {formErrors[`equipmentPrice-${index}`] && <p className="text-red-500 text-sm">{formErrors[`equipmentPrice-${index}`]}</p>}
                            </div>

                            <button
                                type="button"
                                onClick={() => handleRemoveRow("equipment", index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddRow("equipment")}
                        className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                    >
                        Add Equipment
                    </button>
                </div>
                <div>
                    <h3 className="font-bold">Appliances</h3>
                   
                   
                    {form.applianceSetup.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center flex-wrap">
                            <div>

                                <input
                                    type="text"
                                    placeholder="Appliance Name"
                                    value={item.appliance}
                                    onChange={(e) => handleDynamicChange("applianceSetup", index, "appliance", e.target.value)}
                                    className="border p-2 rounded flex-1"
                                />
                                {formErrors[`applianceName-${index}`] && <p className="text-red-500 text-sm">{formErrors[`applianceName-${index}`]}</p>}
                            </div>
                            <div>

                                <input
                                    type="number"
                                    placeholder="Count"
                                    value={item.count}
                                    onChange={(e) => handleDynamicChange("applianceSetup", index, "count", e.target.value)}
                                    className="border p-2 rounded w-20"
                                />
                                {formErrors[`applianceCount-${index}`] && <p className="text-red-500 text-sm">{formErrors[`applianceCount-${index}`]}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveRow("applianceSetup", index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => handleAddRow("applianceSetup")}
                        className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                    >
                        Add Appliance
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {editingPlanId ? "Update Plan" : "Create Plan"}
                </button>
            </form> */}
            {/* Plan Table */}
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 mb-6">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2 text-left">Name</th>
                            <th className="border p-2 text-left">Total Price</th>
                            <th className="border p-2 text-left">Description</th>
                            <th className="border p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center">
                                    <Loading />
                                </td>
                            </tr>
                        ) : checkArrNull(plans) ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center">No plans available.</td>
                            </tr>
                        ) : (
                            plans?.map((plan, index) => (
                                <React.Fragment key={plan?._id}>
                                    {/* Main Row */}
                                    <tr className="border-t border border-b-slate-300">
                                        <td className="p-2 ">{index + 1}. {plan?.name}</td>
                                        <td className="p-2">${plan?.totalPrice}</td>
                                        <td className="p-2">{plan?.description}</td>
                                        <td className="p-2 flex gap-2">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-1"
                                                onClick={() => handleEdit(plan)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => handleDelete(plan?._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Equipment Section */}
                                    <tr>
                                        <td colSpan="4" className="p-2 bg-gray-100">
                                            <strong>Equipment:</strong>
                                            {plan?.equipment.length > 0 ? (
                                                <table className="w-full mt-2 border border-gray-300">
                                                    <thead className="bg-gray-200">
                                                        <tr>
                                                            <th className="border p-2 text-left">Name</th>
                                                            <th className="border p-2 text-left">Quantity</th>
                                                            <th className="border p-2 text-left">Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {plan?.equipment.map((item) => (
                                                            <tr key={item._id}>
                                                                <td className="p-2">{item.name}</td>
                                                                <td className="p-2">{item.quantity}</td>
                                                                <td className="p-2">${item.price}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p className="text-sm text-gray-600 mt-2">No equipment added.</p>
                                            )}
                                        </td>
                                    </tr>
                                    {/* Appliances Section */}
                                    <tr>
                                        <td colSpan="4" className="p-2 bg-gray-100">
                                            <strong>Appliances:</strong>
                                            {plan?.applianceSetup.length > 0 ? (
                                                <table className="w-full mt-2 border border-gray-300">
                                                    <thead className="bg-gray-200">
                                                        <tr>
                                                            <th className="border p-2 text-left">Appliance</th>
                                                            <th className="border p-2 text-left">Count</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {plan?.applianceSetup.map((appliance) => (
                                                            <tr key={appliance._id}>
                                                                <td className="p-2">{appliance.appliance}</td>
                                                                <td className="p-2">{appliance.count}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p className="text-sm text-gray-600 mt-2">No appliances added.</p>
                                            )}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>


                {/* <table className="w-full border border-gray-300 mb-6">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2 text-left ">Name</th>
                            <th className="border p-2 text-left ">Price</th>
                            <th className="border p-2 text-left ">Description</th>
                            <th className="border p-2 text-left ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center">Loading...</td>
                            </tr>
                        ) : plans.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center">No plans available.</td>
                            </tr>
                        ) : (
                            plans.map((plan) => (
                                <tr key={plan?._id} className="border-t">
                                    <td className="p-2">{plan?.name}</td>
                                    <td className="p-2">${plan?.price}</td>
                                    <td className="p-2">{plan?.description}</td>
                                    <td className="p-2 flex gap-2">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleEdit(plan)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleDelete(plan?._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table> */}
            </div>
        </div>
    );
};

export default PlanManagement;

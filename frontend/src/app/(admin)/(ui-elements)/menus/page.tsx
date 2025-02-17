"use client";

import React, { useEffect, useState } from "react";
import TreeComponent from "@/components/ui/Tree";
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addNewMenu, fetchMenuItems, fetchTopMenuItems, deleteMenuItem } from "../../../features/menu/menuSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState } from "@/app/store";
import DeleteModal from "@/components/ui/DeleteModal";

export default function Menus() {
  const dispatch:any = useDispatch();

  interface MenuItemForm {
    name: string;
    parentId: number;
    topMenuId: number;
    depth: number;
  }

  const defaultModalStatus = {
    delete: false,
  };
  const {loading} = useSelector((state: RootState) => state.menu);
  const [modalStatus, setModalStatus] = useState(defaultModalStatus);
  const [selectedItem, setSelectedItem] = useState(
    null as number | null
  );


  const {topMenuItems} = useSelector((state:RootState) => state.menu);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<MenuItemForm>();

  useEffect(() => {
    dispatch(fetchTopMenuItems());
  }, [dispatch]);

  const onSubmit: SubmitHandler<MenuItemForm> = async(data) => {
    await dispatch(addNewMenu({
      name: data.name,
      parentId: data.parentId,
      topMenuId: data.topMenuId
    }));
    dispatch(fetchMenuItems(data.topMenuId));
    reset(); 
  };

  return (
    <div>
      <div className="space-y-5 sm:space-y-6">
        <div className="flex gap-x-3 items-center mb-8">
          <div className="font-bold text-3xl flex items-center gap-x-2">
            <MdSpaceDashboard className="inline-block text-4xl text-white bg-[#253BFF] p-1.5 rounded-full" />
            Menus
          </div>
        </div>
        <DeleteModal
        isOpen={modalStatus.delete}
        setIsOpen={() => {
          setModalStatus(defaultModalStatus);
          setSelectedItem(null);
        }}
        afterClose={()=>
        {
          if(selectedItem){
            dispatch(fetchMenuItems(selectedItem));
          }
        }
        }
        title="Delete Menu"
      >
        <section className="flex flex-col items-center justify-center gap-4 mt-4">
          <p className="text-[#4D515A] text-sm font-medium">
            Are you sure you want to delete this Menu?
          </p>
          <section className="flex gap-4">
            <button
              className="bg-[#E11D48] text-white font-medium py-2 px-4 rounded-lg"
              onClick={() => {
                setModalStatus(defaultModalStatus);
                setSelectedItem(null);
              }}
            >
              No
            </button>
            <button
              className={`w-full bg-[#3170B5] rounded-md text-white h-[40px]  px-4 sm:px-6 capitalize z-10 cursor-pointer opacity-80 hover:opacity-100 transition-all duration-200 ease-in`}
              onClick={async () => {
                console.log(selectedItem)
              await  dispatch(deleteMenuItem(selectedItem as number));
              setModalStatus(defaultModalStatus);
              setSelectedItem(null);
              dispatch(fetchMenuItems(getValues('topMenuId')));
              }}
            >
              Yes
            </button>
          </section>
        </section>
      </DeleteModal>

        <div className="flex flex-col gap-y-2">
          <span className="text-sm text-[#475467">Menu</span>
          <div>
            <select
              className="block w-full lg:w-1/3 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              name="menu"
              id="menu"
              onChange={(e) =>{ setValue("topMenuId", parseInt(e.target.value))
                dispatch(fetchMenuItems(parseInt(e.target.value)))}
              }
            >
              <option disabled selected>
                Select Menu
              </option>
             {/* topMenuItems */}
              {topMenuItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-x-5">
          <div className="w-full lg:w-1/2">
           
            <TreeComponent
            selectNode={(e)=>{
              setValue('parentId', parseInt(e.selectedId))
              setValue('depth', e.depth)
            }}
            deleteItem={(e)=>{
              setModalStatus({delete: true})
              setSelectedItem(parseInt(e.selectedId))
            }}

             />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-1">
                <span className="text-sm text-[#475467]">Menu ID</span>
               
                <input
                  type="text"
                  placeholder="Menu ID"
                  {...register("topMenuId", {
                    required: "Please select a menu",
                    valueAsNumber: true,
                  })}
                  className="block w-full p-4 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-y-1">
                <span className="text-sm text-[#475467]">Depth</span>
               
                <input
                  type="number" // Ensure parentId is a number
                  placeholder="Depth"
                  {...register("depth", {
                    required: "Please select a node",
                    valueAsNumber: true,
                  })}
                  className="block w-full p-4 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500"
                />
                {errors.parentId && (
                  <p className="text-red-500 text-sm">{errors.parentId.message}</p>
                )}
              </div>

              {/* Parent Data */}
              <div className="flex flex-col gap-y-1">
                <span className="text-sm text-[#475467]">Parent Data</span>
                <input
                  type="number" // Ensure parentId is a number
                  placeholder="Enter menu item parent ID"
                  {...register("parentId", {
                    required: "Parent ID is required",
                    valueAsNumber: true,
                  })}
                  className="block w-full p-4 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500"
                />
                {errors.parentId && (
                  <p className="text-red-500 text-sm">{errors.parentId.message}</p>
                )}
              </div>

              {/* Name */}
              <div className="flex flex-col gap-y-1">
                <span className="text-sm text-[#475467]">Name</span>
                <input
                  type="text"
                  placeholder="Enter menu item name"
                  {...register("name", { required: "Name is required" })}
                  className="block w-full p-4 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-1/3 py-3 rounded-full bg-[#253BFF] text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
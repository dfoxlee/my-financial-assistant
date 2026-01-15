import { Bounce, ToastContainer } from "react-toastify";
import Header from "./components/header/Header";
import { useTransactionStore } from "./stores/transactionStore";
import ViewSelector from "./components/ViewSelector";
import Separator from "./components/shared/Separator";
import AssignCategoriesModal from "./components/assign-categories-modal/AssignCategoriesModal";
import { useState } from "react";
import EditCategoriesModal from "./components/edit-categories-modal/EditCategoriesModal";

export default function App() {
   // states
   const [isAssignCategoriesModalOpen, setIsAssignCategoriesModalOpen] =
      useState(false);
   const [isEditCategoriesModalOpen, setIsEditCategoriesModalOpen] =
      useState(false);

   // stores
   const transactions = useTransactionStore((store) => store.transactions);

   // handlers
   const openAssignCategoriesModal = () => {
      setIsAssignCategoriesModalOpen(true);
   };

   const closeAssignCategoriesModal = () => {
      setIsAssignCategoriesModalOpen(false);
   };

   // const openEditCategoriesModal = () => {
   //    setIsEditCategoriesModalOpen(true);
   // };

   const closeEditCategoriesModal = () => {
      setIsEditCategoriesModalOpen(false);
   };

   return (
      <div className="appContainer">
         <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
         />
         {isAssignCategoriesModalOpen && (
            <AssignCategoriesModal
               closeAssignCategoriesModal={closeAssignCategoriesModal}
            />
         )}
         {isEditCategoriesModalOpen && (
            <EditCategoriesModal
               closeEditCategoriesModal={closeEditCategoriesModal}
            />
         )}
         <Header />
         {transactions && transactions.length && <Separator />}
         {transactions && transactions.length && (
            <ViewSelector
               openAssignCategoriesModal={openAssignCategoriesModal}
               // openEditCategoriesModal={openEditCategoriesModal}
            />
         )}
      </div>
   );
}

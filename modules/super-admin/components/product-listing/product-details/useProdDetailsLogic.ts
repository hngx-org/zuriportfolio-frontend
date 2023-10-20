import { useRouter } from "next/router";
import { useRemoveSanction, useRestore, useSanction, useTempDeleteProd } from "../../../../../http/super-admin1";
import { useQueryClient } from "@tanstack/react-query";
import { handleBack } from ".";
import { toast } from "react-toastify";

const useProdDetailsLogic = (id: string) => {
    const route = useRouter();
    const { removeSanction, isLoading } = useRemoveSanction();
    const { restoreProd, isLoading: isRestoring } = useRestore();
    const { deleteSanction, isLoading: isTempDeleting } = useTempDeleteProd();
    const { santionProd, isLoading: isSanctioning } = useSanction();
    const client = useQueryClient();

    const handleRemoveSaction = () => {
        removeSanction(id, {
          onSuccess: (response) => {
            if (response.response.status < 300) {
              toast.success(response.response.status);
              client.invalidateQueries(['get-prod']);
              handleBack(route);
            } else {
              toast.error(response.response.data.message);
            }
          },
          onError: () => {
            toast.success('This product is no longer sanctioned');
            client.invalidateQueries(['get-prod']);
            handleBack(route);
          },
        });
      };
    
      const handleRestoreProd = () => {
        restoreProd(id, {
          onSuccess: (response) => {
            if (response.response.status < 300) {
              client.invalidateQueries(['get-prod']);
              toast.success(response.response.status || 'Product restored successfully');
              handleBack(route);
            } else {
              toast.error(response.response.data.message || 'Error restoring the product');
            }
          },
          onError: (error) => {
            console.log(error);
            client.invalidateQueries(['get-prod']);
            toast.success('Product restored successfully');
            handleBack(route);
          },
        });
      };
    
      const handleDelete = () => {
        deleteSanction(id, {
          onSuccess: (response) => {
            if (response.response.status < 300) {
              client.invalidateQueries(['get-prod']);
              toast.success(response.response.status || 'Product deleted successfully');
              handleBack(route);
            } else {
              toast.error(response.response.data.message || 'Error deleting the product');
            }
          },
          onError: () => {
            client.invalidateQueries(['get-prod']);
            toast.success('Product permanently deleted');
            handleBack(route);
          },
        });
      };
    
      const handleSanction = () => {
        santionProd(id, {
          onSuccess: (response) => {
            if (response.response.status < 300) {
              client.invalidateQueries(['get-prod']);
              toast.success(response.response.status || 'Product sanctioned successfully');
              handleBack(route);
            } else {
              toast.error(response.response.data.message || 'Error sanctioning the product');
            }
          },
          onError: () => {
            client.invalidateQueries(['get-prod']);
            toast.success('Product sanctioned');
            handleBack(route);
          },
        });
      };
    return {
        route,
        isLoading,
        isRestoring,
        isSanctioning,
        isTempDeleting,
        handleDelete,
        handleSanction,
        handleRestoreProd,
        handleRemoveSaction,
    };
}
 
export default useProdDetailsLogic;
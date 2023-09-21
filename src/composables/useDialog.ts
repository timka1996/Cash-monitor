import type { QDialogOptions } from "quasar";
import { useQuasar } from "quasar";
import BaseConfirmDialog from "~/components/ConfirmDialog.vue";

function useDialog() {
  const q = useQuasar();
  return {
    dialog: (
      options?: QDialogOptions & { type?: "warning" | "error" | "info" }
    ) => {
      return q.dialog({
        component: BaseConfirmDialog,
        componentProps: {
          component: BaseConfirmDialog,
          message: "Test",
          title: "Категория учириш",
          persistent: true,
          ok: "Тасдиклаш",
          cancel: "Бекор килиш",
          showAgreement: false,
          ...options,
        },
      });
    },
  };
}

export default useDialog;

import type { FileUploadSelectEvent } from "primevue";
import { uploadAvatar } from "~/services/user";
import { useUserStore } from "~/store/useUserStore";

export const useUserAvatar = () => {
  const userStore = useUserStore();
  const toast = useToast();
  const config = useRuntimeConfig();

  const avatarFile = ref<File | null>(null);
  const avatarSrc = ref<string | null>(null);
  const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

  const isValidImageType = (file: File): boolean =>
    validImageTypes.includes(file.type);

  type severity =
    | "secondary"
    | "success"
    | "info"
    | "warn"
    | "contrast"
    | "error";

  const showToast = (
    severity: severity,
    summary: string,
    detail: string,
    life: number = 3000
  ) => {
    toast.add({ severity, summary, detail, life });
  };

  const onFileSelect = (event: FileUploadSelectEvent) => {
    const file = event.files[0];
    if (file && file.size < 1024 * 1024) {
      if (!isValidImageType(file)) {
        showToast(
          "error",
          "Invalid File",
          "Provided file is not a valid image type!"
        );
        return;
      }
      avatarFile.value = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarSrc.value = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      showToast(
        "error",
        "File Size Error",
        "File size exceeds the limit of 1MB."
      );
    }
  };

  const uploadAvatarHandler = async () => {
    if (!avatarFile.value) {
      showToast("error", "Error", "Please select an image to upload");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile.value);

      const response = await uploadAvatar(formData);
      userStore.setUserAvatar(response.avatar_url);
      showToast("success", "Avatar Uploaded", "Avatar changed successfully!");
      avatarFile.value = null;
    } catch (error: any) {
      showToast(
        "error",
        "Upload Error",
        error?.message || "Failed to upload avatar"
      );
    }
  };

  const removeAvatarHandler = () => {
    avatarFile.value = null;
    avatarSrc.value = null;
  };

  const fullAvatarUrl = `${config.public.BACKEND_BASE_URL}/storage/${userStore?.user?.avatar}`;
  const avatarUrl = computed(() => avatarSrc.value ?? fullAvatarUrl);

  return {
    avatarFile,
    avatarUrl,
    onFileSelect,
    uploadAvatarHandler,
    removeAvatarHandler,
  };
};

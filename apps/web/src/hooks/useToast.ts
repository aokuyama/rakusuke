import toast from "react-hot-toast";

export const useToast = () => {
  return new Toast();
};

class Toast {
  parent?: string;
  constructor(parent?: string) {
    this.parent = parent;
  }
  success = (message: string) => toast.success(message, this.options());

  error = (message: string) => toast.error(message, this.options());

  loading = (message: string): Toast =>
    new Toast(toast.loading(message, this.options()));

  options = () => (this.parent ? { id: this.parent } : undefined);

  dismiss = () => toast.dismiss(this.parent);
}

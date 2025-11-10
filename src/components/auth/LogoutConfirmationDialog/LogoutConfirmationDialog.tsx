import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/Dialog"
import Button from "../../ui/Button"
import { useTranslation } from "react-i18next"

interface LogoutConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

const LogoutConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmationDialogProps) => {
  const { t } = useTranslation()

  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle id="dialog-title" className="text-gray-900 dark:text-white">
            {t("navbar.logoutConfirm")}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto my-1"
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="w-full sm:w-auto my-1"
          >
            {t("common.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutConfirmationDialog


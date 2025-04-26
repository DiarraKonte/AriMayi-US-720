import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useI18n } from "../../../../../../../../locales/client";
import { useContext } from "react";
import { NotificationContext } from "@/app/[locale]/Provider/NotificationProvider";

interface ApplyModalProps {
  onValidate: () => void; // Callback function to execute on validation
  disabled: boolean; // Disables the button if true
}

const ApplyModal: React.FC<ApplyModalProps> = ({ onValidate, disabled }) => {
  const t = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { id } = useParams(); // Extracts job ID from URL parameters
  const notificationApi = useContext(NotificationContext); // Accesses notification system via context

  const showModal = () => {
    setOpen(true);
  };

  // Handles confirmation with simulated delay and navigation
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      onValidate(); // Executes the passed validation function
      setOpen(false);
      setConfirmLoading(false);

      // Displays success notification
      notificationApi.success({
        message: t("Notification.applicationSubmitted"),
        description: t("Notification.applicationSuccess"),
        duration: 3,
      });

      // Redirects to apply page after confirmation
      router.push(`/portal/trainee/jobs/${id}/apply`);
    }, 2000); // Simulates a 2-second processing delay
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        disabled={disabled}
        style={{
          backgroundColor: "#f08c69",
          borderColor: "#f08c69",
          color: "white",
          height: "50px",
          borderRadius: "8px",
          fontSize: "18px",
          fontWeight: "bold",
          width: "200px",
        }}
      >
        {t("TraineeHome.Apply")}
      </Button>

      <Modal
        open={open}
        title={null}
        footer={null}
        onCancel={handleCancel}
        centered
        width={500}
        closeIcon={null} // Disables the default close icon
        styles={{
          body: {
            padding: "30px",
            backgroundColor: "#fff2ee",
            borderRadius: "8px",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{ color: "#f08c69", fontSize: "18px", marginBottom: "30px" }}
          >
            {t("modal.confirmMessage")}
          </p>

          <div style={{ display: "flex", gap: "15px" }}>
            <Button
              onClick={handleOk}
              loading={confirmLoading}
              disabled={disabled}
              style={{
                backgroundColor: "#f08c69",
                borderColor: "#f08c69",
                color: "white",
                height: "40px",
                borderRadius: "6px",
                padding: "0 25px",
              }}
            >
              {t("modal.applyButton")}
            </Button>

            <Button
              onClick={handleCancel}
              style={{
                backgroundColor: "transparent",
                borderColor: "#f08c69",
                color: "#f08c69",
                height: "40px",
                borderRadius: "6px",
                padding: "0 25px",
              }}
            >
              {t("modal.cancelButton")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ApplyModal;

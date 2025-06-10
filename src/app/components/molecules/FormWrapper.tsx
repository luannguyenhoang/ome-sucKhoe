/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { GET_FORM } from "@/src/app/api/Graphql/form";
import { getData } from "@/src/lib/getData";
import { useEffect, useState } from "react";
import { FormGetFly } from "./FormGetFly";
import { FormGoogle } from "./FormGoogle";
import { FormSam } from "./FormSam";

interface FormData {
  type: "form-getfly" | "form-sam" | "form-google" | "unknown";
  url: string;
  uuid: string;
  divId: string;
  divClass: string;
}

export const FormWrapper = ({
  title,
  color,
  type = "form-main",
  showTitle = false,
}: {
  title?: string;
  color?: string;
  type?: "form-main" | "form-popup";
  showTitle?: boolean;
}) => {
  const [processedFormData, setProcessedFormData] = useState<FormData>({
    type: "unknown",
    url: "",
    uuid: "",
    divId: "",
    divClass: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseFormHtml = (htmlString: string): FormData => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    let formType: "form-getfly" | "form-sam" | "form-google" | "unknown" =
      "unknown";
    let url = "";
    let uuid = "";
    let divId = "";
    let divClass = "";

    if (htmlString.includes("sambala.net/formio")) {
      formType = "form-sam";

      const container = doc.querySelector(".formio_form_iframe_container");
      if (container) {
        divId = container.id;
        divClass = container.className;
      }

      const uuidMatch = divId.match(
        /formio_form_iframe_container_([a-zA-Z0-9-]+)/
      );
      if (uuidMatch && uuidMatch[1]) {
        uuid = uuidMatch[1];
      }

      const scriptTags = doc.querySelectorAll("script");
      scriptTags.forEach((script) => {
        const content = script.textContent || "";
        const urlMatch = content.match(/GetForm\("([^"]+)"/);
        if (urlMatch && urlMatch[1]) {
          url = urlMatch[1];
        }
      });
    }

    return {
      type: formType,
      url,
      uuid,
      divId,
      divClass,
    };
  };

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const data = await getData(GET_FORM);

        if (!data) {
          throw new Error("Failed to fetch form data");
        }

        const formData = data.allForm?.nodes?.[0]?.formMain?.form;

        if (!formData) {
          throw new Error("Form data not found");
        }

        const htmlContent =
          type === "form-main" ? formData.formMain : formData.formPopup;

        if (!htmlContent) {
          throw new Error("Form HTML content not found");
        }

        const parsedData = parseFormHtml(htmlContent);

        setProcessedFormData(parsedData);
        setError(null);
      } catch (err) {
        console.error("Error processing form data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [type]);

  if (error) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Dữ liệu đang được chúng tôi cập nhập</div>
      </div>
    );
  }

  return (
    <>
      {title && (
        <h2
          style={{
            fontSize: "18px",
            textAlign: "center",
            color: color || "inherit",
            paddingTop: "10px",
            paddingBottom: "16px",
          }}
        >
          {title}
        </h2>
      )}
      {showTitle && (
        <div className="flex items-center my-7">
          <h2 className="text-2xl font-bold text-black mr-2 uppercase">
            Đăng ký
          </h2>
          <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
          <div className="flex-1 gap-2">
            <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>
        </div>
      )}

      {processedFormData.type === "form-getfly" && (
        <FormGetFly {...processedFormData} />
      )}
      {processedFormData.type === "form-sam" && (
        <FormSam {...processedFormData} />
      )}
      {processedFormData.type === "form-google" && (
        <FormGoogle
          url={processedFormData.url}
          divId={processedFormData.divId}
        />
      )}
    </>
  );
};

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function FormExcel() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    solution: "",
    message: "",
    websitePath: "suc-khoe"
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const solutions = [
    "Dinh dưỡng",
    "Tâm lý",
    "Nghệ thuật - sáng tạo",
    "Vận động",
    "Y học cổ truyền",
    "Y học hiện đại",
    "Phục hồi chức năng",
    "Spa - Massage",
    "Làm đẹp",
    "Thú cưng ",
    "Chăm sóc nhà cửa"
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, phone } = formData;
    const newErrors: typeof errors = {};
    const phoneRegex = /^0[1-9][0-9]{8}$/;

    if (!name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!phoneRegex.test(phone)) {
      newErrors.phone =
        "Số điện thoại phải bắt đầu bằng 0, không có số 0 tiếp theo và đủ 10 chữ số";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbzJy1wZxmOX61xplltLmJT7k6pKc412I4TDL2F3gCfAAOZf6wVORrJ7d25fj9Mc1VC_vQ/exec";

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {},
        body: JSON.stringify(formData)
      });

      const result = JSON.parse(await response.text());
      if (result.status === "success") {
        router.push("/dang-ky-thanh-cong");
      } else {
        throw new Error(result.message || "Lỗi không xác định");
      }
    } catch (error) {
      console.error("Chi tiết lỗi:", error);
    }
  };

  return (
    <div className="mb-10">
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
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto p-6 bg-white rounded-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Họ và Tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Dòng giải pháp
          </label>
          <select
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">-- Chọn dòng giải pháp --</option>
            {solutions.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Để lại lời nhắn cho chúng tôi:
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}

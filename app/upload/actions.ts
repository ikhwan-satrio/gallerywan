'use server'
import cloudinary from '@/lib/cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySession } from '@/lib/auth';
import {
  ServerValidateError,
  createServerValidate,
  ServerFormState,
} from '@tanstack/react-form-nextjs'
import { getFormOpts } from '@/lib/formOpts/uploads'
import { getDictionary, getLanguage, getLocale } from '@/lib/i18n'

function createValidator(language: 'en' | 'id') {
  const messages = getDictionary(language).upload.errors

  return createServerValidate({
    ...getFormOpts(language),
    onServerValidate: ({ value }) => {
      if (!value.files || !(value.files instanceof File)) {
        return {
          formErrors: [messages.required],
          fields: {}
        }
      }
    }
  })
}

const validators = {
  en: createValidator('en'),
  id: createValidator('id'),
}

export type CustomServerFormState = ServerFormState<any, any> & {
  success?: boolean;
  error?: string;
  url?: string;
};

export const uploadsCloud = async (
  state: CustomServerFormState,
  formData: FormData
): Promise<CustomServerFormState> => {
  const language = getLanguage(await getLocale())
  const messages = getDictionary(language).upload.errors

  try {
    const cookieStore = await cookies();
    const session = await verifySession(cookieStore.get(SESSION_COOKIE)?.value);

    if (!session) {
      return {
        ...state,
        success: false,
        error: messages.signIn,
      }
    }

    if (!formData) {
      return {
        ...state,
        success: false,
        error: messages.noFormData,
      }
    }

    const validatedData = await validators[language](formData)

    if (!validatedData.files || !(validatedData.files instanceof File)) {
      return {
        ...state,
        success: false,
        error: messages.invalidFile,
      }
    }

    const arrayBuffer = await validatedData.files.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'memories',
        },
        (error, result) => {
          if (error) reject(error);
          if (result) resolve(result);
        }
      ).end(buffer);
    });

    return {
      ...state,
      success: true,
      error: '',
      url: result.secure_url,
    }
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return {
        ...(e.formState as CustomServerFormState),
        success: false,
      }
    }

    console.error("Cloudinary Upload Error:", e);

    return {
      ...state,
      success: false,
      error: e instanceof Error ? e.message : messages.failed,
    }
  }
}

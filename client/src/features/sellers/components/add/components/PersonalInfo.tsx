import { ChangeEvent, FC, KeyboardEvent, ReactElement, useState } from 'react';
import { IPersonalInfoProps } from '@/features/sellers/interfaces/seller.interface';
import Textarea from '@/shared/Textarea';
import Input from '@/shared/Input';

const PersonalInfo: FC<IPersonalInfoProps> = ({ personalInfo, setPersonalInfo }): ReactElement => {
  const [allowedInfoLength, setAllowedInfoLength] = useState({
    description: '600/600',
    oneliner: '70/70'
  });
  const maxDescriptionCharacters = 600;
  const maxOneLinerCharacters = 70;

  return (
    <div className="border-grey border-b p-6">
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          이름<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <Input
            className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            type="text"
            name="fullname"
            value={personalInfo.fullName}
            onChange={(event: ChangeEvent) => {
              setPersonalInfo({ ...personalInfo, fullName: (event.target as HTMLInputElement).value });
            }}
          />
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="mt-6 pb-2 text-base font-medium md:mt-0">
          한줄 소개<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <Input
            className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            type="text"
            name="oneliner"
            value={personalInfo.oneliner}
            onChange={(event: ChangeEvent) => {
              const onelinerValue: string = (event.target as HTMLInputElement).value;
              setPersonalInfo({ ...personalInfo, oneliner: onelinerValue });
              const counter: number = maxOneLinerCharacters - onelinerValue.length;
              setAllowedInfoLength({ ...allowedInfoLength, oneliner: `${counter}/70` });
            }}
            onKeyDown={(event: KeyboardEvent) => {
              const currentTextLength = (event.target as HTMLInputElement).value.length;
              if (currentTextLength === maxOneLinerCharacters && event.key !== 'Backspace') {
                event.preventDefault();
              }
            }}
          />
          <span className="flex justify-end text-xs text-[#95979d]">{allowedInfoLength.oneliner} 자</span>
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          자기소개<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <Textarea
            className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            name="description"
            value={personalInfo.description}
            rows={5}
            onChange={(event: ChangeEvent) => {
              const descriptionValue: string = (event.target as HTMLInputElement).value;
              setPersonalInfo({ ...personalInfo, description: descriptionValue });
              const counter: number = maxDescriptionCharacters - descriptionValue.length;
              setAllowedInfoLength({ ...allowedInfoLength, description: `${counter}/600` });
            }}
            onKeyDown={(event: KeyboardEvent) => {
              const currentTextLength = (event.target as HTMLInputElement).value.length;
              if (currentTextLength === maxDescriptionCharacters && event.key !== 'Backspace') {
                event.preventDefault();
              }
            }}
          />
          <span className="flex justify-end text-xs text-[#95979d]">{allowedInfoLength.description} 자</span>
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Response Time<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <Input
            className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            type="number"
            name="responseTime"
            placeholder="E.g. 1"
            value={personalInfo.responseTime}
            onChange={(event: ChangeEvent) => {
              const value = (event.target as HTMLInputElement).value;
              setPersonalInfo({ ...personalInfo, responseTime: parseInt(value) > 0 ? value : '' });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

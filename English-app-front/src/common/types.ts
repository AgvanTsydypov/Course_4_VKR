export interface ContainerProps {
  border?: boolean;
  children: React.ReactNode;
}

export interface ContainerProps2 {
  children: React.ReactNode;
}

export interface LoginFormProps {
  children: React.ReactNode;
  title: string;
}

export interface ButtonProps {
  color?: string;
  fixedWidth?: boolean;
  name?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface SvgIconProps {
  src: string;
  width: string;
  height: string;
}

export interface PngIconProps {
  src: string;
  width: string;
  height: string;
}

export interface InputProps {
  name: string;
  placeholder: string;
  t: any;
  type?: string;
  value?: string;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export interface validateProps {
  name: string;
  telegram: string;
  email: string;
  phone: string;
}

export interface reviewProps {
  idForSearch: string;
}

export interface animationProps {
  children: React.ReactNode;
}

export interface tokenPair {
  access_token: string;
  refresh_token: string;
}

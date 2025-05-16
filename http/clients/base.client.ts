import config from "@/config";
import { ErrorMessageTypes } from "@/enums";
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { ApiError } from "../error";

type TBaseApiClientConfig = {
  params?: Record<string, unknown>;
  headers?: AxiosRequestConfig["headers"];
};

export abstract class BaseApiClient {
  private apiInstance: AxiosInstance;
  protected clientUrl: string;

  constructor(url: string, token?: string) {
    this.clientUrl = url;
    this.apiInstance = axios.create({
      timeout: 30000,
      baseURL: `${config.API.baseUrl}${this.clientUrl}`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }

  protected async handleRequest<TData>(request: Promise<AxiosResponse<TData>>) {
    try {
      const response = await request;
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new ApiError(
          e.response ? e.response.data.error.message : e.message,
          e.response
            ? e.response.data.error.type
            : ErrorMessageTypes.SERVER_ERROR,
        );
      }
      throw new ApiError(
        "Something went wrong while processing your request, please try again later!",
        ErrorMessageTypes.SERVER_ERROR,
      );
    }
  }

  public async get<TData>(
    url: string,
    config?: TBaseApiClientConfig,
  ): Promise<TData> {
    return this.handleRequest<TData>(this.apiInstance.get(url, config));
  }

  public async post<TData, TRequest = Record<string, unknown>>(
    url: string,
    data: TRequest,
    config?: TBaseApiClientConfig,
  ): Promise<TData> {
    return this.handleRequest<TData>(this.apiInstance.post(url, data, config));
  }

  public async put<TData, TRequest = Record<string, unknown>>(
    url: string,
    data: TRequest,
    config?: TBaseApiClientConfig,
  ): Promise<TData> {
    return this.handleRequest<TData>(this.apiInstance.put(url, data, config));
  }

  public async patch<TData, TRequest = Record<string, unknown>>(
    url: string,
    data: TRequest,
    config?: TBaseApiClientConfig,
  ): Promise<TData> {
    return this.handleRequest<TData>(this.apiInstance.patch(url, data, config));
  }

  public async delete<TData>(
    url: string,
    config?: TBaseApiClientConfig,
  ): Promise<TData> {
    return this.handleRequest<TData>(this.apiInstance.delete(url, config));
  }
}

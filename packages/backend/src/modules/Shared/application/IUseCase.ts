export interface IUseCase<P, T> {
  run(p?: P): Promise<T> | undefined;
}

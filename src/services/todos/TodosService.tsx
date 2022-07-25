import autoBind from "auto-bind";
import dayjs from "dayjs";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { inject, singleton } from "tsyringe";
import FirebaseService from "../firebase/FirebaseService";
import type { CreateTodo } from "./dtos/CreateTodo";
import type { Todo, TodoStatus } from "./dtos/Todo";
import type { UpdateTodo, UpdateTodoStatus } from "./dtos/UpdateTodo";

@singleton()
class TodosService {
  static readonly NotFound = new Error("Not found");

  constructor(@inject(FirebaseService) private readonly firebaseService: FirebaseService) {
    autoBind(this);
  }

  private get todosCollection() {
    return collection(this.firebaseService.firestore, "todos");
  }

  async getAllTodos(): Promise<Todo[]> {
    const snapshot = await getDocs(this.todosCollection);

    return snapshot.docs
      .map<Todo>(doc => ({
        id: doc.id,
        content: doc.get("content"),
        status: doc.get("status"),
        createdAt: dayjs(doc.get("createdAt")),
      }))
      .sort((a, b) => a.createdAt.diff(b.createdAt));
  }

  async getAllTodosByStatus(status: TodoStatus): Promise<Todo[]> {
    const queryCompleted = query(this.todosCollection, where("status", "==", status));
    const snapshot = await getDocs(queryCompleted);

    return snapshot.docs
      .map<Todo>(doc => ({
        id: doc.id,
        content: doc.get("content"),
        status: doc.get("status"),
        createdAt: dayjs(doc.get("createdAt")),
      }))
      .sort((a, b) => a.createdAt.diff(b.createdAt));
  }

  async getActiveTodosCount(): Promise<number> {
    const queryCompleted = query(this.todosCollection, where("status", "==", "active"));
    const snapshot = await getDocs(queryCompleted);

    return snapshot.size;
  }

  async getTodo(id: string): Promise<Todo> {
    const snapshot = await getDoc(doc(this.todosCollection, id));

    if (!snapshot.exists()) throw TodosService.NotFound;

    return {
      id: snapshot.id,
      content: snapshot.get("content"),
      status: snapshot.get("status"),
      createdAt: snapshot.get("createdAt"),
    };
  }

  async createTodo({ content }: CreateTodo): Promise<Todo["id"]> {
    const docRef = await addDoc(this.todosCollection, {
      content: content,
      status: "active",
      createdAt: dayjs().toISOString(),
    });

    return docRef.id;
  }

  async updateTodoContent({ id, content }: UpdateTodo): Promise<void> {
    await updateDoc(doc(this.todosCollection, id), { content: content });
  }

  async updateTodoStatus({ id, status }: UpdateTodoStatus): Promise<void> {
    await updateDoc(doc(this.todosCollection, id), { status: status });
  }

  async makeAllTodosActive(): Promise<void> {
    const queryCompleted = query(this.todosCollection, where("status", "==", "completed"));
    const snapshot = await getDocs(queryCompleted);

    const batch = writeBatch(this.todosCollection.firestore);

    snapshot.docs.map(doc => doc.ref).forEach(ref => batch.update(ref, { status: "active" }));

    await batch.commit();
  }

  async makeAllTodosCompleted(): Promise<void> {
    const queryCompleted = query(this.todosCollection, where("status", "==", "active"));
    const snapshot = await getDocs(queryCompleted);

    const batch = writeBatch(this.todosCollection.firestore);

    snapshot.docs.map(doc => doc.ref).forEach(ref => batch.update(ref, { status: "completed" }));

    await batch.commit();
  }

  async deleteTodo(id: string): Promise<void> {
    await deleteDoc(doc(this.todosCollection, id));
  }

  async deleteCompletedTodos(): Promise<void> {
    const queryCompleted = query(this.todosCollection, where("status", "==", "completed"));
    const snapshot = await getDocs(queryCompleted);

    const batch = writeBatch(this.todosCollection.firestore);

    snapshot.docs.map(doc => doc.ref).forEach(ref => batch.delete(ref));

    await batch.commit();
  }
}

export default TodosService;

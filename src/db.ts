import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'MyAppDB';
const DB_VERSION = 2;
const QUESTIONS_STORE = 'questions';
const INDIVIDUALS_STORE = 'individuals';
const RESPONSES_STORE = 'responses';
const USERS_STORE = 'users';

class DatabaseSingleton {
    private static instance: DatabaseSingleton | null = null;
    private db: IDBPDatabase | null = null;
    private initPromise: Promise<IDBPDatabase> | null = null;

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public static getInstance(): DatabaseSingleton {
        if (!DatabaseSingleton.instance) {
            DatabaseSingleton.instance = new DatabaseSingleton();
        }
        return DatabaseSingleton.instance;
    }

    public async initDB() {
        if (!this.initPromise) {
            this.initPromise = (async () => {
                this.db = await openDB(DB_NAME, DB_VERSION, {
                    upgrade(db, oldVersion) {
                        if (oldVersion < 1) {
                            if (!db.objectStoreNames.contains(QUESTIONS_STORE)) {
                                db.createObjectStore(QUESTIONS_STORE, { keyPath: 'id', autoIncrement: true });
                            }
                            if (!db.objectStoreNames.contains(INDIVIDUALS_STORE)) {
                                db.createObjectStore(INDIVIDUALS_STORE, { keyPath: 'id', autoIncrement: true });
                            }
                            if (!db.objectStoreNames.contains(RESPONSES_STORE)) {
                                const store = db.createObjectStore(RESPONSES_STORE, { keyPath: 'id', autoIncrement: true });
                                store.createIndex('questionId', 'questionId');
                                store.createIndex('individualId', 'individualId');
                            }
                        }
                        if (oldVersion < 2) {
                            if (!db.objectStoreNames.contains(USERS_STORE)) {
                                db.createObjectStore(USERS_STORE, { keyPath: 'id', autoIncrement: true });
                            }
                        }
                    },
                });
                return this.db;
            })();
        }
        return this.initPromise;
    }

    public async addData(storeName: string, data: any) {
        try {
            const db = await this.initDB();
            const tx = db!.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            await store.put(data);
            await tx.done;
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    public async getData(storeName: string, key?: any) {
        try {
            const db = await this.initDB();
            const tx = db!.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const data = key ? await store.get(key) : await store.getAll();
            await tx.done;
            return data;
        } catch (error) {
            console.error('Error getting data:', error);
        }
        return null;
    }

    public async deleteData(storeName: string, key: any) {
        try {
            const db = await this.initDB();
            const tx = db!.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            await store.delete(key);
            await tx.done;
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }
}

export const dbInstance = DatabaseSingleton.getInstance();

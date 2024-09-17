import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'MyAppDB';
const DB_VERSION = 1;
const QUESTIONS_STORE = 'questions';
const INDIVIDUALS_STORE = 'individuals';
const RESPONSES_STORE = 'responses';

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
                console.log('Initializing DB...');
                this.db = await openDB(DB_NAME, DB_VERSION, {
                    upgrade(db) {
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
                            console.log('Response store created');
                        }
                    },
                });
                return this.db;
            })();
        }
        return this.initPromise;
    }

    public async addData(storeName: string, data: any) {
        console.log('Adding data to store:', storeName, data);
        try {
            const db = await this.initDB();
            const tx = db!.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            await store.put(data);
            await tx.done;
            console.log('Data added successfully to:', storeName);
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    public async getData(storeName: string, key?: any) {
        console.log(`Getting data from store: ${storeName}`);
        try {
            const db = await this.initDB();
            const tx = db!.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const data = key ? await store.get(key) : await store.getAll();
            await tx.done;
            console.log('Data retrieved successfully:', data);
            return data;
        } catch (error) {
            console.error('Error getting data:', error);
        }
        return null;
    }
}

export const dbInstance = DatabaseSingleton.getInstance();

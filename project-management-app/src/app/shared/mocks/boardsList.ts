import {
  BoardModel,
  TaskPriority,
  TaskSize,
} from '../../workspace/board-list-page/models/board.model';

export const boardList: BoardModel[] = [
  {
    title: 'Agrthyr',
    columns: [
      {
        id: '1',
        title: 'Aygbvf',
        tasks: [
          {
            title: 'Htvv',
            priority: TaskPriority.HIGH,
            size: TaskSize.MEDIUM,
            description: 'Duvbfewb',
          },
          {
            title: 'Htvv',
            priority: TaskPriority.URGENT,
            size: TaskSize.TINY,
            description: 'Duvbfewb',
          },
          {
            title: 'Htvv',
            priority: TaskPriority.LOW,
            size: TaskSize.SMALL,
            description: 'Duvbfewb',
          },
          {
            title: 'Htvv',
            priority: TaskPriority.MEDIUM,
            size: TaskSize.LARGE,
            description: 'Duvbfewb',
          },
        ],
      },
      {
        id: '2',
        title: 'Aygbvf',
        tasks: [
          {
            title: 'Htvv',
            priority: TaskPriority.HIGH,
            size: TaskSize.MEDIUM,
            description: 'Duvbfewb',
          },
          {
            title: 'Htvv',
            priority: TaskPriority.URGENT,
            size: TaskSize.TINY,
            description: 'Duvbfewb',
          },
          {
            title: 'Htvv',
            priority: TaskPriority.LOW,
            size: TaskSize.SMALL,
            description: 'Duvbfewb',
          },
          {
            title: 'Htvv',
            priority: TaskPriority.MEDIUM,
            size: TaskSize.LARGE,
            description: 'Duvbfewb',
          },
        ],
      },
      {
        id: '3',
        title: 'Aygbvf',
        tasks: [
          {
            title: 'Htvv',
            priority: TaskPriority.HIGH,
            size: TaskSize.MEDIUM,
            description: 'Duvbfewb',
          },
          {
            title: 'Htvv',
            priority: TaskPriority.LOW,
            size: TaskSize.SMALL,
            description: 'Duvbfewb',
          },
          {
            title: 'Htvv',
            priority: TaskPriority.MEDIUM,
            size: TaskSize.LARGE,
            description: 'Duvbfewb',
          },
        ],
      },
      {
        id: '12',
        title: 'Aygbvf',
        tasks: [
          {
            title: 'Htvv',
            priority: TaskPriority.MEDIUM,
            size: TaskSize.LARGE,
            description: 'Duvbfewb',
          },
        ],
      },
    ],
  },

  { title: 'Fhfjhvdf', columns: [{ id: '0', title: 'Test', tasks: null }] },
  { title: 'Sgregherh', columns: null },
  { title: 'Bfwegfer', columns: null },
  { title: 'Wgrgherh', columns: null },
];

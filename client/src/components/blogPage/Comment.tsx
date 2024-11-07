import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'; // Replace with the actual import path of the `Sheet` component
import { Button } from '@/components/Button';
import { FaRegComment } from 'react-icons/fa';
import { X } from 'lucide-react';
import { buttonStyles } from '@/utils/buttonStyles';

function Comment() {
  return (
    <div className="flex items-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button className={buttonStyles('btn-ghost')}>
            <FaRegComment className="w-8 h-8" />
            <span className="ml-1">1</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="h-full max-w-[30rem] w-full max-[630px]:w-full bg-bgMain"
        >
          <div className="relative h-full">
            <SheetClose asChild>
              <Button className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
            <SheetHeader>
              <SheetTitle>Comments</SheetTitle>
            </SheetHeader>
            {/* Comments */}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Comment;

import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ListContract } from 'src/app/contracts/list.contract';
import helper from 'js-object-helper'
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ToastService } from 'src/app/shared/toast/toast-service';

@Component({
    templateUrl: './user-list.html',
    selector: 'user-list-cmp'
})

export class UserListComponent implements OnInit {

    public users: User[];
    public page: Number = 1;
    public pageSize: Number = 6;
    public total: Number = 0
    public totalPages: Number = 0;
    public requesting: Boolean = false
    constructor(private http: HttpClient, private modal: ModalService, private toast: ToastService) {

    }
    public onPageChange(pageNum: number): void {
        this.page = pageNum
        this.fetchList()
    }
    ngOnInit() {
        /**
         * Call Api to get User List
         */
        this.fetchList()

    }
    deletePopup() {
        this.modal.open('Are you sure to delete this record?', { title: 'Delete User!' })
            .then(({ disable, enable, close }) => {
                disable()
                setTimeout(() => {
                    this.toast.success('Delete Successfully!')
                    close()
                    this.fetchList()
                }, 1000)
            }).catch(() => {
                console.log('Cancel...')
            })
    }
    fetchList() {
        this.requesting = true
        this.http.get(
            '/users?' + helper.objectToQueryString({ page: this.page, per_page: this.pageSize })
        ).forEach((response: ListContract<User[]>) => {
            this.users = response.data
            this.page = response.page
            this.pageSize = response.per_page
            this.total = response.total
            this.totalPages = response.total_pages
            this.requesting = false
        }).catch(e => this.requesting = false)
    }
    whenPageSizeChange(event: Number) {
        // console.log(event, this.pageSize)
        this.page = 0
        this.pageSize = event
        this.fetchList()
        // console.log(event, 'event')
    }
    whenPageChange(event) {
        console.log('whenPageChange', event)
    }
}

interface User {
    id: Number,
    email: String,
    first_name: String,
    last_name: String,
    avatar: String
}
import { trigger, transition, query, style, animate, state, sequence } from '@angular/animations'


export const messageAdded = trigger('messageAdded', [
    transition('void => *', [
        query(':enter', [
            style({transform: 'translateY(10%)', opacity: 0}),
            animate('0.2s ease-in', style({
                transform: 'translateY(0)', opacity: 1
            }))
        ], {optional: true})
    ])
])

export const privateChatAppear = trigger('privateChatAppear', [
    transition('void => *', [
        query('.private-chat-wrapper', [
            style({
                transform: 'translateX(100%) scale(0.2)',
                opacity: 0
            }),
            sequence([
                animate('0.6s ease-in', style({
                    transform: 'translateX(0) scale(1.01)',
                    opacity: 0.6
                })),
                animate('0.2s ease-in', style({
                    filter: 'brightness(100%)',
                    opacity: 0.8
                })),
                animate('0.2s ease-in', style({
                    transform: 'translateX(0) scale(1)',
                    opacity: 1
                }))
            ])
            
        ])
        
    ])
    ]
)

export const chatAppear = trigger('chatAppear', [
    transition('void => *', [
        query('.chat-wrapper', [
            style({
                transform: 'translate(50%, 50%) scale(0)',
                opacity: 0
            }),
            animate('0.4s', style({
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            }))
        ])
    ])
])